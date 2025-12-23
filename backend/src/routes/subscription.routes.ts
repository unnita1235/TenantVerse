import express from 'express';
import Stripe from 'stripe';
import Tenant from '../models/Tenant.model';
import Subscription from '../models/Subscription.model';
import { authenticate, requireRole, requireTenant, AuthRequest } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';
import { ValidationError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

const router = express.Router();

if (!process.env.STRIPE_SECRET_KEY) {
  logger.warn('STRIPE_SECRET_KEY not configured - payment features will be disabled');
}

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia'
    })
  : null;

// All routes require authentication
router.use(authenticate);
router.use(requireTenant);

// @route   GET /api/subscriptions/plans
// @desc    Get available subscription plans
// @access  Private
router.get('/plans', asyncHandler(async (req, res) => {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      description: 'For small teams just getting started.',
      features: ['5 Team Members', '10 Projects', 'Basic Analytics', 'Email Support']
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 79,
      description: 'For growing businesses that need more power.',
      features: ['25 Team Members', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'AI Features']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom needs.',
      features: ['Unlimited Members', 'Dedicated Account Manager', 'SSO & SAML', 'On-prem option']
    }
  ];

  res.json({ success: true, plans });
}));

// @route   POST /api/subscriptions/create-checkout
// @desc    Create Stripe checkout session
// @access  Private (owner or admin only)
router.post(
  '/create-checkout',
  requireRole('owner', 'admin', 'super_admin'),
  asyncHandler(async (req: AuthRequest, res) => {
    if (!stripe) {
      throw new Error('Stripe is not configured');
    }

    const { plan } = req.body;

    if (!['starter', 'pro', 'enterprise'].includes(plan)) {
      throw new ValidationError('Invalid plan');
    }

    const tenant = await Tenant.findById(req.user!.tenantId);
    if (!tenant) {
      throw new NotFoundError('Tenant');
    }

    // Get price ID from environment
    const priceIdMap: { [key: string]: string } = {
      starter: process.env.STRIPE_PRICE_ID_STARTER || '',
      pro: process.env.STRIPE_PRICE_ID_PRO || '',
      enterprise: process.env.STRIPE_PRICE_ID_ENTERPRISE || ''
    };

    const priceId = priceIdMap[plan];
    if (!priceId) {
      throw new ValidationError('Plan not configured. Please contact support.');
    }

    // Create or get Stripe customer
    let customerId = tenant.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user!.email,
        metadata: {
          tenantId: tenant._id.toString(),
          tenantSlug: tenant.slug
        }
      });
      customerId = customer.id;
      tenant.stripeCustomerId = customerId;
      await tenant.save();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:9002'}/t/${tenant.slug}/billing?success=true`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:9002'}/t/${tenant.slug}/billing?canceled=true`,
      metadata: {
        tenantId: tenant._id.toString(),
        plan: plan
      }
    });

    logger.info('Checkout session created', { sessionId: session.id, tenantId: tenant._id, plan });

    res.json({ success: true, sessionId: session.id, url: session.url });
  })
);

// @route   GET /api/subscriptions/current
// @desc    Get current subscription
// @access  Private
router.get('/current', asyncHandler(async (req: AuthRequest, res) => {
  const tenant = await Tenant.findById(req.user!.tenantId);
  if (!tenant) {
    throw new NotFoundError('Tenant');
  }

  let subscription = null;
  if (tenant.stripeSubscriptionId) {
    subscription = await Subscription.findOne({ tenantId: tenant._id });
  }

  res.json({
    success: true,
    subscription: {
      plan: tenant.subscriptionPlan,
      status: tenant.subscriptionStatus,
      startDate: tenant.subscriptionStartDate,
      endDate: tenant.subscriptionEndDate,
      details: subscription
    }
  });
}));

// @route   POST /api/subscriptions/cancel
// @desc    Cancel subscription
// @access  Private (owner or admin only)
router.post('/cancel', requireRole('owner', 'admin', 'super_admin'), asyncHandler(async (req: AuthRequest, res) => {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const tenant = await Tenant.findById(req.user!.tenantId);
  if (!tenant || !tenant.stripeSubscriptionId) {
    throw new NotFoundError('Active subscription');
  }

  // Cancel at period end
  await stripe.subscriptions.update(tenant.stripeSubscriptionId, {
    cancel_at_period_end: true
  });

  const subscription = await Subscription.findOne({ tenantId: tenant._id });
  if (subscription) {
    subscription.cancelAtPeriodEnd = true;
    await subscription.save();
  }

  logger.info('Subscription cancellation scheduled', { tenantId: tenant._id, subscriptionId: tenant.stripeSubscriptionId });

  res.json({ success: true, message: 'Subscription will be canceled at period end' });
}));

// @route   POST /api/subscriptions/webhook
// @desc    Stripe webhook handler
// @access  Public (Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) {
    logger.error('Stripe webhook received but Stripe is not configured');
    return res.status(503).send('Stripe not configured');
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    logger.error('Webhook missing signature or secret');
    return res.status(400).send('Missing signature or webhook secret');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    logger.info('Webhook event received', { type: event.type, id: event.id });
  } catch (err: any) {
    logger.error('Webhook signature verification failed', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const tenantId = session.metadata?.tenantId;
        
        if (tenantId && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          const tenant = await Tenant.findById(tenantId);
          
          if (tenant) {
            tenant.stripeSubscriptionId = subscription.id;
            tenant.subscriptionStatus = subscription.status === 'active' ? 'active' : 'trial';
            tenant.subscriptionPlan = session.metadata?.plan || 'pro';
            tenant.subscriptionStartDate = new Date(subscription.current_period_start * 1000);
            tenant.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
            await tenant.save();

            // Save subscription details
            await Subscription.findOneAndUpdate(
              { tenantId: tenant._id },
              {
                tenantId: tenant._id,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                plan: tenant.subscriptionPlan as 'starter' | 'pro' | 'enterprise',
                status: subscription.status as any,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end || false
              },
              { upsert: true, new: true }
            );
          }
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const tenant = await Tenant.findOne({ stripeSubscriptionId: subscription.id });
        
        if (tenant) {
          if (event.type === 'customer.subscription.deleted') {
            tenant.subscriptionStatus = 'cancelled';
            tenant.subscriptionPlan = 'free';
          } else {
            tenant.subscriptionStatus = subscription.status === 'active' ? 'active' : 'expired';
            tenant.subscriptionEndDate = new Date(subscription.current_period_end * 1000);
            
            await Subscription.findOneAndUpdate(
              { tenantId: tenant._id },
              {
                status: subscription.status as any,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end || false
              }
            );
          }
          await tenant.save();
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (error: any) {
    logger.error('Webhook handler error', error, { eventType: event.type, eventId: event.id });
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;


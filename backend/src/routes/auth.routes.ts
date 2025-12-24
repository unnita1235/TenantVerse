import express, { Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import Tenant from '../models/Tenant.model';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import { ValidationError, ConflictError, AuthenticationError, NotFoundError } from '../utils/errors';
import { asyncHandler } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

const router = express.Router();

// Generate JWT token
const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not configured');
  }
  // Use 7 days in seconds as default
  const expiresInSeconds = 7 * 24 * 60 * 60; // 7 days
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expiresInSeconds });
};

// @route   POST /api/auth/register
// @desc    Register a new user and create tenant
// @access  Public
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty(),
    body('organizationName').trim().notEmpty(),
    body('organizationSlug').trim().matches(/^[a-z0-9-]+$/).optional()
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }

    const { email, password, name, organizationName, organizationSlug } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Generate slug if not provided
    const slug = organizationSlug || organizationName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      throw new ValidationError('Invalid organization slug format');
    }

    // Check if tenant slug exists
    const existingTenant = await Tenant.findOne({ slug });
    if (existingTenant) {
      throw new ConflictError('Organization slug already taken');
    }

    // Create tenant first
    const tenant = await Tenant.create({
      name: organizationName,
      slug,
      subscriptionStatus: 'trial',
      subscriptionPlan: 'free'
    });

    // Create user as owner
    const user = await User.create({
      email,
      password,
      name,
      role: 'owner',
      tenantId: tenant._id,
      isEmailVerified: false
    });

    // Update tenant with owner
    tenant.ownerId = user._id;
    await tenant.save();

    const token = generateToken(user._id.toString());

    logger.info('New user registered', { userId: user._id, email: user.email, tenantId: tenant._id });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId
      },
      tenant: {
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug
      }
    });
  })
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array()[0].msg);
    }

    const { email, password } = req.body;
    logger.info(`Login attempt for: ${email}`);

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      logger.warn(`Login failed: User not found for ${email}`);
      throw new AuthenticationError('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn(`Login failed: Password mismatch for ${email}`);
      throw new AuthenticationError('Invalid credentials');
    }

    const token = generateToken(user._id.toString());

    // Get tenant info
    const tenant = user.tenantId ? await Tenant.findById(user.tenantId) : null;

    logger.info('User logged in', { userId: user._id, email: user.email });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenantId: user.tenantId
      },
      tenant: tenant ? {
        id: tenant._id,
        name: tenant.name,
        slug: tenant.slug
      } : null
    });
  })
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id).populate('tenantId');

  if (!user) {
    throw new NotFoundError('User');
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenantId: user.tenantId
    }
  });
}));

export default router;


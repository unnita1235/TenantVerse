import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    description: 'For small teams just getting started.',
    features: ['5 Team Members', '10 Projects', 'Basic Analytics', 'Email Support'],
    isCurrent: false,
    cta: 'Upgrade to Starter',
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'For growing businesses that need more power.',
    features: ['25 Team Members', 'Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'AI Features'],
    isCurrent: true,
    cta: 'Manage Subscription',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs.',
    features: ['Unlimited Members', 'Dedicated Account Manager', 'SSO & SAML', 'On-prem option'],
    isCurrent: false,
    cta: 'Contact Sales',
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Subscription & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription plan and billing details.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.highlight ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}>
            <CardHeader>
              <CardTitle className="font-headline">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div>
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={tier.isCurrent} variant={tier.isCurrent ? 'outline' : 'default'}>
                {tier.isCurrent ? 'Current Plan' : tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
       <Card>
        <CardHeader>
          <CardTitle className="font-headline">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No invoices yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}

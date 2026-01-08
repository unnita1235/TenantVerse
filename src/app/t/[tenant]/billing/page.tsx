'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function BillingPage({ params }: { params: { tenant: string } }) {
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plansResponse, subscriptionResponse] = await Promise.all([
        apiClient.getPlans(),
        apiClient.getCurrentSubscription()
      ]);

      if (plansResponse.success && plansResponse.data) {
        setPlans((plansResponse.data as any).plans || []);
      }

      if (subscriptionResponse.success && subscriptionResponse.data) {
        setCurrentSubscription(subscriptionResponse.data);
      }
    } catch (error) {
      console.error('Failed to fetch billing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    setProcessing(planId);
    try {
      const response = await apiClient.createCheckout(planId);
      if (response.success && response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to create checkout session',
          variant: 'destructive',
        });
        setProcessing(null);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create checkout session',
        variant: 'destructive',
      });
      setProcessing(null);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? It will remain active until the end of the billing period.')) {
      return;
    }

    setProcessing('cancel');
    try {
      const response = await apiClient.cancelSubscription();
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Subscription will be canceled at the end of the billing period',
        });
        fetchData();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to cancel subscription',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to cancel subscription',
        variant: 'destructive',
      });
    } finally {
      setProcessing(null);
    }
  };

  const currentPlan = currentSubscription?.plan || 'free';

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Subscription & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription plan and billing details.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          const isHighlight = isCurrent;

          return (
            <Card key={plan.id} className={`flex flex-col ${isHighlight ? 'border-primary ring-2 ring-primary shadow-lg' : ''}`}>
              <CardHeader>
                <CardTitle className="font-headline">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div>
                  <span className="text-4xl font-bold">
                    {plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
                  </span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature: string) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 flex-shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={isCurrent || processing === plan.id}
                  variant={isCurrent ? 'outline' : 'default'}
                  onClick={() => !isCurrent && handleSubscribe(plan.id)}
                >
                  {processing === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : plan.price === 'Custom' ? (
                    'Contact Sales'
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {currentPlan !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Current Subscription</CardTitle>
            <CardDescription>Manage your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Plan:</strong> {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}</p>
              <p><strong>Status:</strong> {currentSubscription?.status || 'Active'}</p>
              {currentSubscription?.endDate && (
                <p><strong>Renews:</strong> {new Date(currentSubscription.endDate).toLocaleDateString()}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={processing === 'cancel'}
            >
              {processing === 'cancel' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Cancel Subscription'
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

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

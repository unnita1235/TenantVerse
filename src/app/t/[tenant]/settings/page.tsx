'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function SettingsPage({ params }: { params: { tenant: string } }) {
  const router = useRouter();
  const [tenant, setTenant] = useState<any>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTenant();
  }, []);

  const fetchTenant = async () => {
    try {
      const response = await apiClient.getTenant(params.tenant);
      if (response.success && response.data) {
        setTenant(response.data);
        setName(response.data.name || '');
      }
    } catch (error) {
      console.error('Failed to fetch tenant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await apiClient.updateTenant(params.tenant, { name });
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Settings updated successfully',
        });
        fetchTenant();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update settings',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you absolutely sure? This will permanently delete the "${params.tenant}" organization and all its data. This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await apiClient.deleteTenantBySlug(params.tenant);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Organization deleted successfully',
        });
        // Redirect to home page after successful deletion
        router.push('/');
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to delete organization',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete organization',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-2xl">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your organization's settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Update your organization's name and other details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              id="org-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-slug">Tenant Slug</Label>
            <Input id="org-slug" value={params.tenant} disabled />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>These actions are irreversible. Please be certain.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg bg-destructive/5">
            <div>
              <p className="font-medium text-destructive">Delete Organization</p>
              <p className="text-sm text-muted-foreground">
                This will permanently delete the <span className="font-bold">{params.tenant}</span> organization and all its data.
              </p>
            </div>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

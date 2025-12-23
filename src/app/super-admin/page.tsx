'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, Users, DollarSign, Activity } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { apiClient } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const statusVariant: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  active: 'secondary',
  trial: 'default',
  expired: 'destructive',
  cancelled: 'destructive',
};

export default function SuperAdminPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await apiClient.getAdminTenants();
      if (response.success && response.data) {
        setTenants(response.data.tenants || []);
        setSummary(response.data.summary || {});
      }
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (tenantId: string, status: string) => {
    try {
      const response = await apiClient.updateTenantStatus(tenantId, status);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Tenant status updated',
        });
        fetchTenants();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update status',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (MRR)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary?.totalRevenue?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">from {summary?.totalTenants || 0} tenants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.activeTenants || 0}</div>
            <p className="text-xs text-muted-foreground">{summary?.trialTenants || 0} on trial</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">All Systems Go</div>
            <p className="text-xs text-muted-foreground">No incidents reported</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>A list of all registered organizations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Joined</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[tenant.status] || 'outline'}>
                      {tenant.status?.charAt(0).toUpperCase() + tenant.status?.slice(1) || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>{tenant.plan?.charAt(0).toUpperCase() + tenant.plan?.slice(1) || 'Free'}</TableCell>
                  <TableCell className="text-right">
                    {tenant.joined ? format(new Date(tenant.joined), 'yyyy-MM-dd') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => window.location.href = `/t/${tenant.slug}`}>
                          View Tenant
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(tenant.id, tenant.status === 'active' ? 'expired' : 'active')}>
                          {tenant.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Tenant
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

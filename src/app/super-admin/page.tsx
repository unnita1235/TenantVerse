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

const tenants = [
    { name: 'Acme Inc.', plan: 'Pro', status: 'Active', revenue: 79, joined: '2023-10-25' },
    { name: 'Stark Industries', plan: 'Enterprise', status: 'Active', revenue: 500, joined: '2023-09-01' },
    { name: 'Wayne Enterprises', plan: 'Pro', status: 'Active', revenue: 79, joined: '2023-11-12' },
    { name: 'Globex Corporation', plan: 'Starter', status: 'Trial', revenue: 0, joined: '2024-01-05' },
    { name: 'Cyberdyne Systems', plan: 'Free', status: 'Expired', revenue: 0, joined: '2023-08-15' },
];

const statusVariant: { [key: string]: 'default' | 'secondary' | 'outline' | 'destructive' } = {
  Active: 'secondary',
  Trial: 'default',
  Expired: 'destructive',
};


export default function SuperAdminPage() {
    const totalRevenue = tenants.reduce((acc, tenant) => acc + tenant.revenue, 0);

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
                        <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">from {tenants.length} tenants</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tenants.filter(t => t.status === 'Active' || t.status === 'Trial').length}</div>
                        <p className="text-xs text-muted-foreground">{tenants.filter(t => t.status === 'Trial').length} on trial</p>
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
                            {tenants.map(tenant => (
                                <TableRow key={tenant.name}>
                                    <TableCell className="font-medium">{tenant.name}</TableCell>
                                    <TableCell><Badge variant={statusVariant[tenant.status]}>{tenant.status}</Badge></TableCell>
                                    <TableCell>{tenant.plan}</TableCell>
                                    <TableCell className="text-right">{tenant.joined}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Tenant</DropdownMenuItem>
                                                <DropdownMenuItem>Suspend Tenant</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete Tenant</DropdownMenuItem>
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

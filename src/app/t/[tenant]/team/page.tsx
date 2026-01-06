'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiClient, User } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const roleVariant: { [key: string]: 'default' | 'secondary' | 'outline' } = {
  owner: 'default',
  admin: 'secondary',
  member: 'outline',
};

export default function TeamPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ email: '', name: '', role: 'member' });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.getUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    try {
      const response = await apiClient.inviteUser(inviteData);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'User invited successfully',
        });
        setInviteOpen(false);
        setInviteData({ email: '', name: '', role: 'member' });
        fetchUsers();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to invite user',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: err.message || 'Failed to invite user',
        variant: 'destructive',
      });
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await apiClient.updateUserRole(userId, newRole);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'User role updated',
        });
        fetchUsers();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to update role',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: err.message || 'Failed to update role',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this user?')) return;

    try {
      const response = await apiClient.deleteUser(userId);
      if (response.success) {
        toast({
          title: 'Success',
          description: 'User removed successfully',
        });
        fetchUsers();
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to remove user',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: err.message || 'Failed to remove user',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Invite and manage your team members.</p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>Add a new member to your organization.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={inviteData.name}
                    onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteData.email}
                    onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteData.role} onValueChange={(value) => setInviteData({ ...inviteData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleInvite}>Invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" asChild>
            <Link href={`/t/${params.tenant}/team/onboard`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              AI Onboarding
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>A list of all users in your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id || user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://picsum.photos/seed/${user.email}/100/100`} alt={user.name} />
                        <AvatarFallback>{user.name?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={roleVariant[user.role] || 'outline'}>
                      {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'Member'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                          const newRole = user.role === 'admin' ? 'member' : 'admin';
                          handleRoleChange(user._id || user.id, newRole);
                        }}>
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(user._id || user.id)}
                        >
                          Remove User
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

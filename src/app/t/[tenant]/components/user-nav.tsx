'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, LifeBuoy, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { apiClient, User as UserType } from '@/lib/api';

export function UserNav() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const tenantSlug = params?.tenant as string;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const handleLogout = () => {
    apiClient.logout();
    if (typeof document !== 'undefined') {
      document.cookie = 'token=; path=/; max-age=0';
    }
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://picsum.photos/seed/${user?.email || 'user'}/100/100`} alt={user?.name || 'User'} />
            <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || ''}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {tenantSlug && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/t/${tenantSlug}/billing`}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/t/${tenantSlug}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  BookUser,
  CreditCard,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from 'lucide-react';
import Logo from '@/components/logo';

export function DashboardNav({ tenant }: { tenant: string }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: `/t/${tenant}`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/t/${tenant}/team`, label: 'Team', icon: Users },
    { href: `/t/${tenant}/guides`, label: 'AI Guides', icon: BookUser },
    { href: `/t/${tenant}/billing`, label: 'Billing', icon: CreditCard },
    { href: `/t/${tenant}/settings`, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <SidebarHeader className="p-4">
        <Logo light />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Super Admin' }}>
              <Link href="/super-admin">
                <Shield />
                <span>Super Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

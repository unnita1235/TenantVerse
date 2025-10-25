import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { DashboardHeader } from './components/dashboard-header';
import { DashboardNav } from './components/dashboard-nav';

export default async function DashboardLayout({ children, params }: { children: React.ReactNode; params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon" className="group-data-[variant=sidebar]:bg-sidebar">
        <DashboardNav tenant={tenant} />
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

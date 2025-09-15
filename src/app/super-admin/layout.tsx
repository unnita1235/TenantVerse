import Logo from '@/components/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <div className="flex items-center gap-4">
            <Logo />
            <span className="text-sm font-semibold text-muted-foreground border-l pl-4">Super Admin</span>
        </div>
        <Button asChild variant="outline" size="sm">
            <Link href="/t/acme">
                <Home className="mr-2 h-4 w-4" />
                Back to App
            </Link>
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}

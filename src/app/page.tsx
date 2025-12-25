import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, ShieldCheck, Users } from "lucide-react";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Logo />
        <nav className="space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Build Your SaaS Empire with TenantVerse
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-8">
            The ultimate foundation for multi-tenancy, RBAC, and
            subscription-based applications. Launch faster, scale smarter.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Sign Up for Free</Link>
          </Button>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline">
                  Rapid Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Focus on your features, not boilerplate. TenantVerse provides
                  the core architecture for your multi-tenant app.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline">
                  Secure & Isolated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built-in tenant isolation and Role-Based Access Control (RBAC)
                  ensure your customer data is always safe.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-md">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-headline">
                  Scalable by Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From your first customer to thousands, our architecture is
                  designed to grow with your business.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} TenantVerse. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organizationName: '',
    organizationSlug: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [id]: value };
      // Auto-generate slug from organization name
      if (id === 'organizationName' && !prev.organizationSlug) {
        updated.organizationSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organizationName: formData.organizationName,
        organizationSlug: formData.organizationSlug || undefined
      });
      
      if (response.success && response.data?.token && response.data?.tenant) {
        // Token is already set by apiClient, but also set cookie for middleware
        if (typeof document !== 'undefined') {
          document.cookie = `token=${response.data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        }
        router.push(`/t/${response.data.tenant.slug}`);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your information to create your new organization.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="organizationName">Organization Name</Label>
            <Input 
              id="organizationName" 
              placeholder="Acme Inc." 
              value={formData.organizationName}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="organizationSlug">Organization Slug (URL)</Label>
            <Input 
              id="organizationSlug" 
              placeholder="acme" 
              value={formData.organizationSlug}
              onChange={handleChange}
              pattern="[a-z0-9-]+"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

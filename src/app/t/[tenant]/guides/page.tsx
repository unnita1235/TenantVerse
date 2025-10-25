'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { getPersonalizedGuide } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2, BookOpen, ListChecks, Terminal } from 'lucide-react';
import { useEffect, useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Generate Guide
    </Button>
  );
}

export default function GuidesPage({ params }: { params: Promise<{ tenant: string }> }) {
  const [tenant, setTenant] = useState<string>('');
  const initialState = { success: false, data: null, error: '' };
  const [state, formAction] = useFormState(getPersonalizedGuide, initialState);

  useEffect(() => {
    params.then(({ tenant }) => setTenant(tenant));
  }, [params]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Personalized User Guide Generation</h1>
        <p className="text-muted-foreground">Let AI create a custom onboarding experience for your users.</p>
      </div>

      <form action={formAction}>
        <input type="hidden" name="tenantName" value={tenant} />
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Define the user's role and context within your organization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="userRole">User Role</Label>
              <Select name="userRole" required>
                <SelectTrigger id="userRole">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="permissionSettings">Permission Settings</Label>
              <Textarea
                id="permissionSettings"
                name="permissionSettings"
                placeholder="e.g., Can create and edit projects, but cannot manage billing or invite users."
                rows={3}
                required
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="expectedAppUsage">Expected App Usage</Label>
              <Textarea
                id="expectedAppUsage"
                name="expectedAppUsage"
                placeholder="e.g., This user will primarily be responsible for managing their own tasks and collaborating on documents."
                rows={3}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      {state.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.success && state.data && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <BookOpen className="text-primary" />
                Personalized User Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-lg">{state.data.userGuide}</pre>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <ListChecks className="text-accent" />
                Suggested Onboarding Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-lg">{state.data.onboardingFlow}</pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { getRbacSuggestions } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader2, Lightbulb, Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Get Suggestions
    </Button>
  );
}

export default function OnboardPage() {
  const initialState = { success: false, data: null, error: '' };
  const [state, formAction] = useFormState(getRbacSuggestions, initialState);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">AI Team Onboarding</h1>
        <p className="text-muted-foreground">Describe your team and let AI suggest the best roles for them.</p>
      </div>

      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Team Details</CardTitle>
            <CardDescription>Provide information about your team members and how they'll use TenantVerse.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="profiles">Team Member Profiles</Label>
              <Textarea
                id="profiles"
                name="profiles"
                placeholder="e.g.,&#10;- Sarah, Project Manager, needs to oversee all projects.&#10;- David, Frontend Developer, will work on UI tasks.&#10;- Chloe, Marketing Intern, needs to view campaign progress."
                rows={5}
                required
              />
               <p className="text-sm text-muted-foreground">Enter one team member profile per line.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="usage">Expected App Usage</Label>
              <Textarea
                id="usage"
                name="usage"
                placeholder="e.g., We'll use this app for project management, tracking tasks, and collaborating on documents."
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Lightbulb className="text-accent" />
              Suggested Roles
            </CardTitle>
            <CardDescription>Here are the RBAC roles our AI suggests for your team members.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              {state.data.suggestedRoles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

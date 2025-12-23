'use server';

/**
 * @fileOverview Generates personalized user guides and onboarding flows tailored to roles and permission settings.
 *
 * - generatePersonalizedUserGuide - A function that generates a personalized user guide.
 * - PersonalizedUserGuideInput - The input type for the generatePersonalizedUserGuide function.
 * - PersonalizedUserGuideOutput - The return type for the generatePersonalizedUserGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedUserGuideInputSchema = z.object({
  tenantName: z.string().describe('The name of the tenant.'),
  userRole: z.string().describe('The role of the user (e.g., Owner, Admin, Member).'),
  permissionSettings: z
    .string()
    .describe('A description of the permission settings for the user.'),
  expectedAppUsage: z.string().describe('Description of how the user will use the app'),
});
export type PersonalizedUserGuideInput = z.infer<typeof PersonalizedUserGuideInputSchema>;

const PersonalizedUserGuideOutputSchema = z.object({
  userGuide: z.string().describe('The generated personalized user guide.'),
  onboardingFlow: z.string().describe('The generated onboarding flow.'),
});
export type PersonalizedUserGuideOutput = z.infer<typeof PersonalizedUserGuideOutputSchema>;

export async function generatePersonalizedUserGuide(
  input: PersonalizedUserGuideInput
): Promise<PersonalizedUserGuideOutput> {
  return personalizedUserGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedUserGuidePrompt',
  input: {schema: PersonalizedUserGuideInputSchema},
  output: {schema: PersonalizedUserGuideOutputSchema},
  prompt: `You are an AI assistant specialized in creating personalized user guides and onboarding flows for SaaS applications.

  Based on the tenant name, user role, permission settings, and expected app usage, generate a user guide and an onboarding flow tailored to the user's specific needs.

  Tenant Name: {{{tenantName}}}
  User Role: {{{userRole}}}
  Permission Settings: {{{permissionSettings}}}
  Expected App Usage: {{{expectedAppUsage}}}

  User Guide:
  Onboarding Flow: `,
});

const personalizedUserGuideFlow = ai.defineFlow(
  {
    name: 'personalizedUserGuideFlow',
    inputSchema: PersonalizedUserGuideInputSchema,
    outputSchema: PersonalizedUserGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

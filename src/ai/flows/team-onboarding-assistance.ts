// src/ai/flows/team-onboarding-assistance.ts
"use server";

/**
 * @fileOverview An AI agent for suggesting RBAC roles for team onboarding.
 *
 * - suggestRbacRoles - A function that suggests RBAC roles based on team member profiles and expected app usage.
 * - SuggestRbacRolesInput - The input type for the suggestRbacRoles function.
 * - SuggestRbacRolesOutput - The return type for the suggestRbacRoles function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const SuggestRbacRolesInputSchema = z.object({
  teamMemberProfiles: z
    .array(z.string())
    .describe("An array of descriptions for each team member profile."),
  expectedAppUsage: z
    .string()
    .describe(
      "A description of how the app is expected to be used by the team.",
    ),
});
export type SuggestRbacRolesInput = z.infer<typeof SuggestRbacRolesInputSchema>;

const SuggestRbacRolesOutputSchema = z.object({
  suggestedRoles: z
    .array(z.string())
    .describe("An array of suggested RBAC roles for the team members."),
});
export type SuggestRbacRolesOutput = z.infer<
  typeof SuggestRbacRolesOutputSchema
>;

export async function suggestRbacRoles(
  input: SuggestRbacRolesInput,
): Promise<SuggestRbacRolesOutput> {
  return suggestRbacRolesFlow(input);
}

const prompt = ai.definePrompt({
  name: "suggestRbacRolesPrompt",
  input: { schema: SuggestRbacRolesInputSchema },
  output: { schema: SuggestRbacRolesOutputSchema },
  prompt: `You are an expert in RBAC (Role-Based Access Control) and team onboarding.

  Based on the team member profiles and expected app usage provided, suggest appropriate RBAC roles for each team member.

  Consider roles such as Owner, Admin, Member, Editor, Viewer, etc.

  Team Member Profiles:
  {{#each teamMemberProfiles}}
  - {{{this}}}
  {{/each}}

  Expected App Usage: {{{expectedAppUsage}}}

  Suggested Roles:`,
});

const suggestRbacRolesFlow = ai.defineFlow(
  {
    name: "suggestRbacRolesFlow",
    inputSchema: SuggestRbacRolesInputSchema,
    outputSchema: SuggestRbacRolesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);

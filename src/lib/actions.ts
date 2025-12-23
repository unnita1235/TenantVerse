'use server';
import { suggestRbacRoles, SuggestRbacRolesInput } from '@/ai/flows/team-onboarding-assistance';
import { generatePersonalizedUserGuide, PersonalizedUserGuideInput } from '@/ai/flows/personalized-user-guide-generation';

export async function getRbacSuggestions(previousState: any, formData: FormData) {
  try {
    const input: SuggestRbacRolesInput = {
      teamMemberProfiles: (formData.get('profiles') as string).split('\n').filter(p => p.trim() !== ''),
      expectedAppUsage: formData.get('usage') as string,
    };
    
    if (!input.teamMemberProfiles.length || !input.expectedAppUsage) {
      return { success: false, data: null, error: 'Please fill out all fields.' };
    }

    const result = await suggestRbacRoles(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    // Error logging would be handled by error tracking service in production
    return { success: false, data: null, error: 'Failed to get suggestions. Please try again.' };
  }
}

export async function getPersonalizedGuide(previousState: any, formData: FormData) {
  try {
    const input: PersonalizedUserGuideInput = {
      tenantName: formData.get('tenantName') as string,
      userRole: formData.get('userRole') as string,
      permissionSettings: formData.get('permissionSettings') as string,
      expectedAppUsage: formData.get('expectedAppUsage') as string,
    };
    
    if (!input.userRole || !input.permissionSettings || !input.expectedAppUsage) {
       return { success: false, data: null, error: 'Please fill out all fields.' };
    }

    const result = await generatePersonalizedUserGuide(input);
    return { success: true, data: result, error: null };
  } catch (error) {
    // Error logging would be handled by error tracking service in production
    return { success: false, data: null, error: 'Failed to generate guide. Please try again.' };
  }
}

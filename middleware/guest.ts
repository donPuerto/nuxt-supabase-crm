// middleware/guest.ts
export default defineNuxtRouteMiddleware(async () => {
  const { checkSession, userProfile, fetchUserProfile } = useAuth();
  const user = useSupabaseUser();
  
  try {
    // Check if session is valid
    const hasValidSession = await checkSession();
    
    // If user is authenticated
    if (hasValidSession && user.value) {
      // Fetch user profile if not already loaded
      if (!userProfile.value) {
        const { error: profileError } = await fetchUserProfile();
        if (profileError) {
          console.error('Failed to fetch user profile:', profileError);
          return;
        }
      }

      // Check user status and redirect accordingly
      if (userProfile.value) {
        if (!userProfile.value.is_active) {
          return navigateTo('/auth/suspended');
        }

        switch (userProfile.value.status) {
        case 'suspended':
          return navigateTo('/auth/suspended');
        case 'pending':
          return navigateTo('/auth/pending');
        case 'inactive':
          return navigateTo('/auth/inactive');
        case 'active':
          // Get intended route from localStorage
          let redirectTo = '/dashboard';
          if (import.meta.client) {
            const intendedRoute = localStorage.getItem('intendedRoute');
            if (intendedRoute) {
              redirectTo = intendedRoute;
              localStorage.removeItem('intendedRoute');
            }
          }

          // Check if onboarding is needed
          if (!userProfile.value.is_active && redirectTo !== '/welcome') {
            return navigateTo('/welcome');
          }

          return navigateTo(redirectTo);
        }
      }
    }
  } catch (error) {
    console.error('Guest middleware error:', error);
    // If session check fails, allow access to guest pages
    if (import.meta.client) {
      localStorage.removeItem('intendedRoute');
    }
  }
});

interface UserProfile {
  is_active: boolean;
  status: 'suspended' | 'pending' | 'inactive' | 'active';
  is_active: boolean;
}

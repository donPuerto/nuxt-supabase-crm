export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/reset-password',
    '/auth/callback',
  ];

  // Skip middleware for public routes
  if (publicRoutes.includes(to.path)) {
    return;
  }

  const { checkSession, userProfile, fetchUserProfile } = useAuth();
  const user = useSupabaseUser();

  try {
    // Check if session is valid
    const hasValidSession = await checkSession();
    
    if (!hasValidSession || !user.value) {
      // Store intended route for redirect after login
      if (import.meta.client) {
        localStorage.setItem('intendedRoute', to.fullPath);
      }
      return navigateTo('/auth/login');
    }

    // Fetch user profile if not already loaded
    if (!userProfile.value) {
      const { error: profileError } = await fetchUserProfile();
      if (profileError) {
        console.error('Failed to fetch user profile:', profileError);
        return navigateTo('/auth/login');
      }
    }

    // Check if user is active
    if (userProfile.value && !userProfile.value.is_active) {
      return navigateTo('/auth/suspended');
    }

    // Check user status
    if (userProfile.value?.status !== 'active') {
      switch (userProfile.value?.status) {
      case 'suspended':
        return navigateTo('/auth/suspended');
      case 'pending':
        return navigateTo('/auth/pending');
      case 'inactive':
        return navigateTo('/auth/inactive');
      default:
        return navigateTo('/auth/login');
      }
    }

    // Handle onboarding flow
    if (to.path === '/welcome') {
      // If user has completed onboarding, redirect to dashboard
      if (userProfile.value?.is_active) {
        return navigateTo('/dashboard');
      }
      // Otherwise, allow access to welcome page
      return;
    }

    // If user hasn't completed onboarding, redirect to welcome
    if (!userProfile.value?.is_active && to.path !== '/welcome') {
      return navigateTo('/welcome');
    }

    // Additional role-based access control
    const requiredRole = to.meta.requiredRole as string;
    if (requiredRole) {
      const { hasRole } = useRBAC();
      const hasRequiredRole = await hasRole(requiredRole);
      
      if (!hasRequiredRole) {
        return navigateTo('/unauthorized');
      }
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Clear any stored routes
    if (import.meta.client) {
      localStorage.removeItem('intendedRoute');
    }
    
    return navigateTo('/auth/login');
  }
});

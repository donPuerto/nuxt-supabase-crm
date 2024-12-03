export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware for auth routes
  if (to.path.startsWith('/auth/')) {
    return;
  }

  const { checkSession } = useAuth();
  const user = useSupabaseUser();

  try {
    await checkSession();
    
    // If no user, redirect to login
    if (!user.value) {
      // Store the intended destination
      localStorage.setItem('intendedRoute', to.fullPath);
      
      // Redirect to login page
      return navigateTo('/auth/login');
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return navigateTo('/auth/login');
  }
});

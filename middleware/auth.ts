export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware for auth routes
  if (to.path.startsWith('/auth/')) {
    return;
  }

  const { checkSession } = useAuth();
  const user = useSupabaseUser();

  try {
    // Wait for session check
    await checkSession();
    
    // If no user, redirect to login
    if (!user.value) {
      // Store the intended destination
      localStorage.setItem('intendedRoute', to.fullPath);
      
      // Redirect to login page
      return navigateTo('/auth/login');
    }
  } catch (error) {
    // If session check fails, redirect to login
    console.error('Session check failed:', error);
    return navigateTo('/auth/login');
  }
});

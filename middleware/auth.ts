export default defineNuxtRouteMiddleware(async (to) => {
  const { checkSession, isAuthenticated } = useAuth();
  
  try {
    // Check if the session is valid
    const isSessionValid = await checkSession();

    // If the session is not valid or the user is not authenticated, redirect to login
    if (!isSessionValid || !isAuthenticated.value) {
      // Store the intended destination, but only if it's not the login page itself
      if (to.path !== '/auth/login') {
        localStorage.setItem('intendedRoute', to.fullPath);
      }

      // Redirect to login page
      return navigateTo('/auth/login');
    }

    // If we reach here, the user is authenticated
    
    // Check if we're navigating to a guest-only route (like login or register)
    const guestRoutes = ['/auth/login', '/auth/register'];
    if (guestRoutes.includes(to.path)) {
      // Redirect authenticated users away from guest routes to the dashboard
      return navigateTo('/dashboard');
    }

    // Allow navigation to continue for authenticated users
    return;
  } catch (error) {
    // In case of an error during session check, redirect to login for safety
    console.log(error);
    return navigateTo('/auth/login');
  }
});

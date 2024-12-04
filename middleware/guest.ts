// middleware/guest.ts
export default defineNuxtRouteMiddleware(async () => {
  const { checkSession } = useAuth();
  const user = useSupabaseUser();
  
  try {
    // Wait for session check
    await checkSession();
    
    // If user is authenticated, redirect to dashboard
    if (user.value) {
      return navigateTo('/dashboard');
    }
  } catch (error) {
    // If session check fails, allow access to guest pages
    console.error('Session check failed:', error);
  }
});

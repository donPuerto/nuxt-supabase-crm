// middleware/guest.ts
export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser();
  
  // If user is authenticated, redirect to dashboard
  if (user.value) {
    return navigateTo('/dashboard');
  }
});

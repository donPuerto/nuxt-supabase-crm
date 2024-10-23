// middleware/guest.ts
export default defineNuxtRouteMiddleware(async () => {
  const { checkSession, isAuthenticated } = useAuth();

  const isSessionValid = await checkSession();

  if (isSessionValid && isAuthenticated.value) {
    
    return navigateTo('/dashboard');
  }
  
});

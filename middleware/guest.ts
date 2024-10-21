// middleware/guest.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { checkSession, isAuthenticated } = useAuth();

  console.log('Guest middleware - Current route:', to.path);

  const isSessionValid = await checkSession();
  console.log('Guest middleware - Session valid:', isSessionValid);

  if (isSessionValid && isAuthenticated.value) {
    console.log('Guest middleware - User already authenticated, redirecting to dashboard');
    return navigateTo('/dashboard');
  }

  console.log('Guest middleware - User is a guest, allowing access');
});

export default defineNuxtRouteMiddleware((_to, _from) => {
  const { user, checkSession } = useAuth();

  if (!user.value || !checkSession()) {
    return navigateTo('/auth/login');
  }

});

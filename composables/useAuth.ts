import { ref, computed } from 'vue';

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const loading = ref(false);
  const error = ref('');

  const isAuthenticated = computed(() => !!user.value);

  const signInWithOAuth = async (provider: 'github' | 'google' | 'facebook') => {
    loading.value = true;
    error.value = '';
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (signInError) error.value = signInError.message;
    loading.value = false;
  };

  const signOut = async () => {
    loading.value = true;
    error.value = '';
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) error.value = signOutError.message;
    loading.value = false;
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signInWithOAuth,
    signOut,
  };
};

export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const loading = ref(false);
  const error = ref('');

  const isAuthenticated = computed(() => !!user.value);

  const signInWithEmailAndPassword = async (email: string, password: string, rememberMe: boolean = false) => {
    loading.value = true;
    error.value = '';

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,      
    });

    if (signInError) {
      error.value = signInError.message;
      loading.value = false;
      throw new Error(signInError.message); // Throw the error
    } else if (data?.session) {
      // Store the rememberMe preference
      localStorage.setItem('rememberMe', rememberMe.toString());

      if (rememberMe) {
        // Set a longer expiration for the session
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        localStorage.setItem('sessionExpires', expiresAt.toISOString());
      } else {
        // Remove any existing expiration
        localStorage.removeItem('sessionExpires');
      }
    } else {
      throw new Error('No session data returned'); // Throw an error if no session data
    }
    loading.value = false;
  };

  const signOut = async () => {
    loading.value = true;
    error.value = '';
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      error.value = signOutError.message;
    } else {
      // Clear session-related items from localStorage
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('sessionExpires');
    }
    loading.value = false;
  };

  const checkSession = () => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const sessionExpires = localStorage.getItem('sessionExpires');

    if (!rememberMe || !sessionExpires) {
      return true; // Session is valid (either not remembered or no expiration set)
    }

    const expirationDate = new Date(sessionExpires);
    if (expirationDate > new Date()) {
      return true; // Session is still valid
    }

    // Session has expired
    signOut();
    return false;
  };
  
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

  const sendPasswordResetEmail = async (email: string) => {
    loading.value = true;
    error.value = '';

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (resetError) {
      error.value = resetError.message;
      loading.value = false;
      throw new Error(resetError.message);
    }

    loading.value = false;
  };

  const signUp = async (email: string, password: string) => {
    loading.value = true;
    error.value = '';

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      error.value = signUpError.message;
      loading.value = false;
      throw new Error(signUpError.message);
    }

    loading.value = false;
    return data;
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signInWithEmailAndPassword,
    signInWithOAuth,
    signOut,
    checkSession,
    sendPasswordResetEmail,
    signUp,
  };
};

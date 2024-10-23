export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const loading = ref(false);
  const error = ref('');

  const isAuthenticated = computed(() => !!user.value);

  // Function to set up auth state change listener
  const setupAuthListener = () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Update the user value when the auth state changes
      user.value = session?.user || null;

      // You can add more logic here based on the event type
      switch (event) {
      case 'SIGNED_IN':
        console.log('User signed in:', session?.user);
        break;
      case 'SIGNED_OUT':
        console.log('User signed out');
        break;
      case 'USER_UPDATED':
        console.log('User updated:', session?.user);
        break;
      case 'PASSWORD_RECOVERY':
        console.log('Password recovery event received');
        break;
      }
    });

    // Return the cleanup function
    return () => {
      subscription.unsubscribe();
    };
  };

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    loading.value = true;
    error.value = '';

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) throw signInError;

      if (data?.session) {
        // Update user state
        user.value = data.user;
        return data;
      } else {
        throw new Error('No session data returned');
      }
    } catch(err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during sign in';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkSession = async () => {
    // Skip session check on the server side
    if (!import.meta.client) return true;

    try {
      // Attempt to retrieve the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
      // If there's an error retrieving the session, throw it
      if (sessionError) throw sessionError;

      // If no session is found, return false (user is not authenticated)
      if (!session) {
        return false;
      }

      // Update user value to ensure it's always in sync with the session
      user.value = session.user;

      // Clear any previous errors
      error.value = '';

      // Session is valid, return true
      return true;
    } catch (err) {
      // Handle the error and set it to the error ref
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unexpected error occurred while checking the session';
      }
      // You might want to handle or log this error in a production environment
      return false;
    }
  };

  const signOut = async () => {
    loading.value = true;
    error.value = '';
    
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      
      user.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during sign out';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signInWithOAuth = async (provider: 'github' | 'google' | 'facebook') => {
    loading.value = true;
    error.value = '';

    try {
      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (signInError) throw signInError;
      
      return data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred during OAuth sign in';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (email: string, password: string) => {
    loading.value = true;
    error.value = '';
    console.log({ email, password });
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (signUpError) {
        console.error('SignUp Error:', signUpError);
        throw signUpError;
      }

      if (data?.user?.identities?.length === 0) {
        throw new Error('An account with this email already exists.');
      }
      
      return data;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'An unexpected error occurred';
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    loading.value = true;
    error.value = '';

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) throw resetError;

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred sending reset email';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    signInWithEmailAndPassword,
    signInWithOAuth,
    signOut,
    sendPasswordResetEmail,
    signUp,
    checkSession,
    setupAuthListener
  };
};

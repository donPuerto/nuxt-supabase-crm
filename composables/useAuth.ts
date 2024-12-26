import type { Provider } from '@supabase/supabase-js';
import type { Database } from '~/types/supabase';

interface UserProfile {
  // Primary identification
  id: string;  // UUID from auth.users
  email: string;
  username: string;  // @username format

  // Personal information
  first_name: string;
  last_name: string;
  display_name?: string;
  date_of_birth?: string;  // Date stored as string in TypeScript
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  avatar_url?: string;
  bio?: string;

  // Professional information
  company?: string;
  job_title?: string;
  department?: string;
  industry?: string;
  website?: string;

  // Account settings
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  preferred_language?: string;
  timezone?: string;
  is_active: boolean;

  // Onboarding and verification
  onboarding_completed: boolean;
  onboarding_step?: number;
  email_verified: boolean;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  marketing_consent?: boolean;

  // Security
  two_factor_enabled: boolean;
  last_login_at?: string;
  last_active_at?: string;

  // Audit fields
  created_at: string;
  created_by?: string;  // UUID stored as string
  updated_at: string;
  updated_by?: string;  // UUID stored as string
  deleted_at?: string;
  deleted_by?: string;  // UUID stored as string
  version: number;
}

interface UserPreferences {
  id: string;
  user_id: string;

  // Notification preferences
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
  in_app_notifications: boolean;

  // Email preferences
  weekly_digest: boolean;
  marketing_emails: boolean;

  // UI preferences
  theme: 'system' | 'light' | 'dark';
  sidebar_collapsed: boolean;
  display_density: 'comfortable' | 'compact' | 'spacious';

  // Audit fields
  created_at: string;
  created_by?: string;
  updated_at: string;
  updated_by?: string;
  deleted_at?: string;
  deleted_by?: string;
}

export const useAuth = (): {
  user: any;
  userProfile: Ref<UserProfile | null>;
  userPreferences: Ref<UserPreferences | null>;
  loading: Ref<boolean>;
  error: Ref<string>;
  isAuthenticated: ComputedRef<boolean>;
  checkSession: () => Promise<boolean>;
  refreshSession: () => Promise<any>;
  registerWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithSocialProvider: (provider: Provider) => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (newPassword: string) => Promise<any>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<any>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<any>;
  completeOnboarding: () => Promise<any>;
  signOut: () => Promise<void>;
  setupAuthListener: () => () => void;
  fetchUserProfile: () => Promise<UserProfile | null>;
} => {
  const supabase = useSupabaseClient<Database>();
  const user = useSupabaseUser();
  const loading = ref(false);
  const error = ref('');
  const router = useRouter();

  const isAuthenticated = computed(() => !!user.value);
  const userProfile = ref<UserProfile | null>(null);
  const userPreferences = ref<UserPreferences | null>(null);

  // Session Management
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  };

  const refreshSession = async () => {
    const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) throw refreshError;
    return session;
  };

  // Profile Management
  const fetchUserProfile = async (): Promise<UserProfile | null> => {
    loading.value = true;
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value?.id)
      .single();

    if (fetchError) {
      error.value = fetchError.message;
      loading.value = false;
      return null;
    }

    userProfile.value = data;
    loading.value = false;
    return data;
  };

  const fetchUserPreferences = async () => {
    if (!user.value?.id) return null;

    const { data, error: prefError } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.value.id)
      .single();

    if (prefError) throw prefError;
    userPreferences.value = data;
    return data;
  };

  // Registration Flow
  const registerWithEmailAndPassword = async (email: string, password: string) => {
    loading.value = true;
    error.value = '';

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Create initial profile
      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          onboarding_completed: false,
        });

        // Create default preferences
        await supabase.from('user_preferences').insert({
          user_id: data.user.id,
          email_notifications: true,
          weekly_digest: true,
          theme: 'system',
        });
      }

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  // Login Flow
  const signInWithEmailAndPassword = async (email: string, password: string) => {
    loading.value = true;
    error.value = '';

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Fetch profile and preferences
      if (data.user) {
        await Promise.all([
          fetchUserProfile(),
          fetchUserPreferences(),
        ]);
      }

      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  // Social Authentication
  const signInWithSocialProvider = async (provider: Provider) => {
    loading.value = true;
    error.value = '';

    try {
      const { data, error: socialError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (socialError) throw socialError;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  // Password Recovery
  const resetPassword = async (email: string) => {
    loading.value = true;
    error.value = '';

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) throw resetError;
      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      return { error: err };
    } finally {
      loading.value = false;
    }
  };

  const updatePassword = async (newPassword: string) => {
    loading.value = true;
    error.value = '';

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;
      return { error: null };
    } catch (err: any) {
      error.value = err.message;
      return { error: err };
    } finally {
      loading.value = false;
    }
  };

  // Onboarding Flow
  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!user.value?.id) throw new Error('No user logged in');

    loading.value = true;
    error.value = '';

    try {
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.value.id)
        .select()
        .single();

      if (updateError) throw updateError;
      userProfile.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user.value?.id) throw new Error('No user logged in');

    loading.value = true;
    error.value = '';

    try {
      const { data, error: updateError } = await supabase
        .from('user_preferences')
        .update(preferences)
        .eq('user_id', user.value.id)
        .select()
        .single();

      if (updateError) throw updateError;
      userPreferences.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  const completeOnboarding = async () => {
    if (!user.value?.id) throw new Error('No user logged in');

    loading.value = true;
    error.value = '';

    try {
      const { data, error: updateError } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', user.value.id)
        .select()
        .single();

      if (updateError) throw updateError;
      userProfile.value = data;
      return { data, error: null };
    } catch (err: any) {
      error.value = err.message;
      return { data: null, error: err };
    } finally {
      loading.value = false;
    }
  };

  // Session cleanup
  const signOut = async () => {
    loading.value = true;
    error.value = '';

    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      // Clear local state
      userProfile.value = null;
      userPreferences.value = null;
      
      // Redirect to login
      await router.push('/auth/login');
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Auth state change listener
  const setupAuthListener = () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      user.value = session?.user || null;

      switch (event) {
      case 'SIGNED_IN':
        if (session?.user) {
          await Promise.all([
            fetchUserProfile(),
            fetchUserPreferences(),
          ]);
        }
        break;
      case 'SIGNED_OUT':
        userProfile.value = null;
        userPreferences.value = null;
        await router.push('/auth/login');
        break;
      case 'USER_UPDATED':
        if (session?.user) {
          await fetchUserProfile();
        }
        break;
      case 'PASSWORD_RECOVERY':
        await router.push('/auth/reset-password');
        break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  };

  return {
    user,
    userProfile,
    userPreferences,
    loading,
    error,
    isAuthenticated,
    checkSession,
    refreshSession,
    registerWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithSocialProvider,
    resetPassword,
    updatePassword,
    updateProfile,
    updatePreferences,
    completeOnboarding,
    signOut,
    setupAuthListener,
    fetchUserProfile,
  };
};

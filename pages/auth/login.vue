<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';
import {  AUTH_SOCIAL_PROVIDERS } from '~/utils/constants';
import type { AuthSocialProvider } from '@/types';

definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});

const { toast } = useToast();
const { start, finish } = useLoadingIndicator();

const { meta, handleSubmit, defineField, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Please enter a valid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address').required().label('Email'),
    password: yup.string().required().label('Password'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const { signInWithEmailAndPassword, signInWithOAuth, checkSession,isAuthenticated, loading, error } = useAuth();

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { email, password } = values;
  loading.value = true;
  start();
  try {
    const { session } = await signInWithEmailAndPassword(email, password);
    if (session) {
      toast({
        title: 'Signed in successfully',
        description: 'Welcome to the platform.',
        variant: 'success',      
      });

      resetForm();
      
      // Check for intended route and redirect accordingly
      const intendedRoute = localStorage.getItem('intendedRoute');
      if (intendedRoute) {
        localStorage.removeItem('intendedRoute');
        await navigateTo(intendedRoute);
      } else {
        await navigateTo('/dashboard');
      }
    } else {
      throw new Error('No session data returned');
    }
    
  } catch (error) {
    toast({
      title: 'An Error Occurred',
      description: (error as Error)?.message || 'Failed to sign in. Please try again later.',
      variant: 'destructive',      
    });
  }
  finally {
    loading.value = false;
    finish();
  }
});

const handleSocialLogin = async (providerName: AuthSocialProvider) => {
  if (providerName === 'github' || providerName === 'google' || providerName === 'facebook') {
    try {
      loading.value = true;
      start();
      await signInWithOAuth(providerName);
      // Note: The redirect handling will be managed by Supabase's OAuth flow
    } catch (error) {
      toast({
        title: 'Authentication Error',
        description: (error as Error)?.message || `Failed to sign in with ${providerName}.`,
        variant: 'destructive',
      });
    } finally {
      loading.value = false;
      finish();
    }
  } else {
    toast({
      title: 'Unsupported Provider',
      description: `Provider '${providerName}' is not supported.`,
      variant: 'destructive',
    });
  }
};

// Redirect if already authenticated
onMounted(async () => {
  const isSessionValid = await checkSession();
  if (isSessionValid && isAuthenticated.value) {
    await navigateTo('/dashboard');
  }
});

</script>

<template>
  <div class="p-6 space-y-6 border rounded-lg shadow-md border-border bg-card sm:p-8 md:p-10">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="mt-2 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-primary hover:underline">Create today!</NuxtLink>
      </p>
    </div>
    
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="email" class="block mb-1 text-sm font-medium text-foreground">Email</UiLabel>
        <UiInput
          id="email"
          v-bind="emailAttrs"
          v-model="email"
          type="email"
          placeholder="you@email.com"
        />
        <span v-if="errors.email" class="pt-1 text-sm text-destructive">{{ errors.email }}</span>
      </div>
      <div>
        <UiLabel for="password" class="block mb-1 text-sm font-medium text-foreground">Password</UiLabel>
        <UiInput
          id="password"
          v-bind="passwordAttrs"
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete
        />
        <span v-if="errors.password" class="pt-1 text-sm text-destructive">{{ errors.password }}</span>
      </div>
      <UiButton 
        type="submit" 
        class="w-full"
        :disabled="!meta.touched"
        :loading="loading"
      >
        Sign in
      </UiButton>
    </form>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-border" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="px-2 bg-card text-muted-foreground">Or continue with</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <UiButton 
        v-for="provider in AUTH_SOCIAL_PROVIDERS"
        :key="provider.name"
        class="flex items-center justify-center w-full"
        variant="ghost"
        :disabled="loading"
        @click="handleSocialLogin(provider.name)"
      >
        <Icon 
          :name="provider.icon" 
          :size="provider.size" 
          class="hidden mr-2 sm:inline-block md:mr-0"
        /> 
        <span class="sm:hidden">{{ provider.label }}</span>
        <span class="hidden sm:inline md:hidden lg:inline">{{ provider.label }}</span>
      </UiButton>
    
    </div>

    <p v-if="error" class="text-sm text-center text-destructive">{{ error }}</p>
  </div>
</template>

<style scoped>
.ui-button .icon {
  @apply !hidden md:!inline-block;
}
</style>

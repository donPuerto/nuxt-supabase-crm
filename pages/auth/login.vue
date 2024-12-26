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

const { signInWithEmailAndPassword, signInWithSocialProvider, loading, error } = useAuth();

const onSubmit = handleSubmit(async (values) => {
  try {
    start();
    const { data, error: loginError } = await signInWithEmailAndPassword(values.email, values.password);
    
    if (loginError) {
      toast({
        title: 'Error',
        description: loginError.message,
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      toast({
        title: 'Welcome back!',
        description: 'Successfully signed in.',
        variant: 'success',
      });
    }
  } catch (e: any) {
    toast({
      title: 'Error',
      description: e.message || 'An error occurred during sign in',
      variant: 'destructive',
    });
  } finally {
    finish();
  }
});

const handleSocialLogin = async (providerName: AuthSocialProvider) => {
  try {
    start();
    const { error: socialError } = await signInWithSocialProvider(providerName);
    
    if (socialError) {
      toast({
        title: 'Error',
        description: socialError.message,
        variant: 'destructive',
      });
    }
  } catch (e: any) {
    toast({
      title: 'Error',
      description: e.message || 'Failed to initialize social login',
      variant: 'destructive',
    });
  } finally {
    finish();
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
  <div class="space-y-6 rounded-lg border border-border bg-card p-6 shadow-md sm:p-8 md:p-10">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="mt-2 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-primary hover:underline">Create today!</NuxtLink>
      </p>
    </div>
    
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="email" class="mb-1 block text-sm font-medium text-foreground">Email</UiLabel>
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
        <UiLabel for="password" class="mb-1 block text-sm font-medium text-foreground">Password</UiLabel>
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
        <span class="bg-card px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <UiButton 
        v-for="provider in AUTH_SOCIAL_PROVIDERS"
        :key="provider.name"
        class="flex w-full items-center justify-center"
        variant="ghost"
        :disabled="loading"
        @click="handleSocialLogin(provider.name)"
      >
        <Icon 
          :name="provider.icon" 
          :size="provider.size" 
          class="mr-2 hidden sm:inline-block md:mr-0"
        /> 
        <span class="sm:hidden">{{ provider.label }}</span>
        <span class="hidden sm:inline md:hidden lg:inline">{{ provider.label }}</span>
      </UiButton>
    
    </div>

    <p v-if="error" class="text-center text-sm text-destructive">{{ error }}</p>
  </div>
</template>

<style scoped>
.ui-button .icon {
  @apply !hidden md:!inline-block;
}
</style>

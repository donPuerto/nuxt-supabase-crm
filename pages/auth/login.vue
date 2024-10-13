<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';
import {  AUTH_SOCIAL_PROVIDERS } from '~/utils/constants';
import type { AuthSocialProvider } from '@/types';

definePageMeta({
  layout: 'auth',
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

const { signInWithEmailAndPassword, signInWithOAuth, loading, error } = useAuth();

const rememberMe = ref(false);

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { email, password } = values;
  loading.value = true;
  start();
  try {
    await signInWithEmailAndPassword(email, password);
    toast({
      title: 'Signed in successfully',
      description: 'Welcome to the platform.',
      variant: 'success',      
    });

    resetForm();
    // Consider adding a redirect here
    // navigateTo('/dashboard');
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

const handleSocialLogin = (providerName: AuthSocialProvider) => {
  if (providerName === 'github' || providerName === 'google' || providerName === 'facebook') {
    signInWithOAuth(providerName);
  } else {
    toast({
      title: 'Unsupported Provider',
      description: `Provider '${providerName}' is not supported.`,
      variant: 'destructive',
    });
  }
};
</script>

<template>
  <div class="bg-card rounded-lg border border-border shadow-md p-6 sm:p-8 md:p-10 space-y-6">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-sm text-muted-foreground mt-2">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-primary hover:underline">Create today!</NuxtLink>
      </p>
    </div>
    
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <UiLabel for="email" class="block text-sm font-medium text-foreground mb-1">Email</UiLabel>
        <UiInput
          id="email"
          v-bind="emailAttrs"
          v-model="email"
          type="email"
          placeholder="you@email.com"
        />
        <span v-if="errors.email" class="text-destructive text-sm pt-1">{{ errors.email }}</span>
      </div>
      <div>
        <UiLabel for="password" class="block text-sm font-medium text-foreground mb-1">Password</UiLabel>
        <UiInput
          id="password"
          v-bind="passwordAttrs"
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete
        />
        <span v-if="errors.password" class="text-destructive text-sm pt-1">{{ errors.password }}</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UiCheckbox 
            id="remember-me"
            v-model="rememberMe"
            type="checkbox"
          />
          <UiLabel for="remember-me" class="ml-2 block text-sm text-foreground">Remember me</UiLabel>
        </div>
        <div class="text-sm">
          <NuxtLink to="/auth/forgot-password" class="text-primary hover:underline">Forgot password?</NuxtLink>
        </div>
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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UiButton 
        v-for="provider in AUTH_SOCIAL_PROVIDERS"
        :key="provider.name"
        class="w-full flex items-center justify-center"
        variant="ghost"
        :disabled="loading"
        @click="handleSocialLogin(provider.name)"
      >
        <Icon 
          :name="provider.icon" 
          :size="provider.size" 
          class="md:mr-0 mr-2 hidden sm:inline-block"
        /> 
        <span class="sm:hidden">{{ provider.label }}</span>
        <span class="hidden sm:inline md:hidden lg:inline">{{ provider.label }}</span>
      </UiButton>
    
    </div>

    <p v-if="error" class="text-destructive text-sm text-center">{{ error }}</p>
  </div>
</template>

<style scoped>
.ui-button .icon {
  @apply !hidden md:!inline-block;
}
</style>

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
    password: yup.string().min(8, 'Password must be at least 8 characters').required().label('Password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required().label('Confirm Password'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

const { signUp, loading, error, signInWithOAuth } = useAuth();

const onSubmit = handleSubmit(async (values) => {
  const { email, password } = values;
  loading.value = true;
  start();
  try {
    await signUp(email, password);
    toast({
      title: 'Registration Successful',
      description: 'Please check your email to verify your account.',
      variant: 'success',      
    });
    // You might want to redirect the user or clear the form here
  } catch (error) {
    toast({
      title: 'An Error Occurred',
      description: (error as Error)?.message || 'Failed to register. Please try again later.',
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
      <h1 class="text-2xl font-bold">Create an account</h1>
      <p class="text-sm text-muted-foreground mt-2">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary hover:underline">Sign in</NuxtLink>
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
      <div>
        <UiLabel for="confirm-password" class="block text-sm font-medium text-foreground mb-1">Confirm Password</UiLabel>
        <UiInput
          id="confirm-password"
          v-bind="confirmPasswordAttrs"
          v-model="confirmPassword"
          type="password"
          placeholder="••••••••"
          autocomplete
        />
        <span v-if="errors.confirmPassword" class="text-destructive text-sm pt-1">{{ errors.confirmPassword }}</span>
      </div>
      <UiButton 
        type="submit" 
        class="w-full"
        :disabled="!meta.touched"
        :loading="loading"
      >
        Create Account
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

<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';
import { navigateTo } from 'vite-plugin-ssr/client/router';

definePageMeta({
  layout: 'auth',
});

const { toast } = useToast();
const { start, finish } = useLoadingIndicator();

const { meta, handleSubmit, defineField, errors } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Please enter a valid email address').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address').required().label('Email'),
  }),
});

const [email, emailAttrs] = defineField('email');

const { resetPassword, loading, error } = useAuth();

const onSubmit = handleSubmit(async (values) => {
  try {
    start();
    const { error: resetError } = await resetPassword(values.email);
    
    if (resetError) {
      toast({
        title: 'Error',
        description: resetError.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Check your email',
      description: 'If an account exists with this email, you will receive password reset instructions.',
      variant: 'success',
    });
    
    // Navigate to confirmation page
    navigateTo('/auth/thank-you');
  } catch (e: any) {
    toast({
      title: 'Error',
      description: e.message || 'Failed to send reset email',
      variant: 'destructive',
    });
  } finally {
    finish();
  }
});
</script>

<template>
  <div class="bg-card rounded-lg border border-border shadow-md p-6 sm:p-8 md:p-10 space-y-6">
    <div class="text-left">
      <h1 class="text-2xl font-bold">Forgot Password</h1>
      <p class="text-sm text-muted-foreground mt-2">
        Enter your email address and we'll send you a link to reset your password.
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
      <UiButton 
        type="submit" 
        class="w-full"
        :disabled="!meta.touched"
        :loading="loading"
      >
        Send Reset Link
      </UiButton>
    </form>

    <div class="text-center">
      <NuxtLink to="/auth/login" class="text-primary hover:underline">Back to Login</NuxtLink>
    </div>

    <p v-if="error" class="text-destructive text-sm text-center">{{ error }}</p>
  </div>
</template>

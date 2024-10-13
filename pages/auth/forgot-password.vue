<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';
import * as yup from 'yup';

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

const { sendPasswordResetEmail, loading, error } = useAuth();

const onSubmit = handleSubmit(async (values) => {
  const { email } = values;
  loading.value = true;
  start();
  try {
    await sendPasswordResetEmail(email);
    toast({
      title: 'Reset Email Sent',
      description: 'Please check your email for password reset instructions.',
      variant: 'success',      
    });
  } catch (error) {
    toast({
      title: 'An Error Occurred',
      description: (error as Error)?.message || 'Failed to send reset email. Please try again later.',
      variant: 'destructive',      
    });
  }
  finally {
    loading.value = false;
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

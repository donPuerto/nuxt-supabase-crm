<template>
  <div class="space-y-6 rounded-lg border border-border bg-card p-6 shadow-md sm:p-8 md:p-10">
    <div class="text-center space-y-4">
      <Icon name="ph:check-circle-fill" class="h-16 w-16 text-success mx-auto" />
      
      <h1 class="text-2xl font-bold">Thank You for Registering!</h1>
      
      <div class="space-y-2">
        <p class="text-muted-foreground">
          Your account has been created successfully.
        </p>
        <p class="text-sm text-muted-foreground">
          Please check your email to verify your account.
        </p>
      </div>

      <div class="pt-4">
        <UiButton @click="navigateTo('/auth/login')" class="w-full sm:w-auto">
          Continue to Login
        </UiButton>
      </div>

      <p class="text-xs text-muted-foreground pt-4">
        Didn't receive the email? Check your spam folder or
        <button 
          @click="handleResendEmail" 
          class="text-primary hover:underline"
          :disabled="loading"
        >
          click here to resend
        </button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast';

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
});

const { loading, error } = useAuth();
const toast = useToast();

const handleResendEmail = async () => {
  // TODO: Implement resend email functionality
  toast({
    title: 'Coming Soon',
    description: 'Resend email functionality will be available soon.',
    variant: 'default'
  });
};
</script>

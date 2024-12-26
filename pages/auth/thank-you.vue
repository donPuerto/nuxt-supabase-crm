<script setup lang="ts">
import { useToast } from '@/composables/useToast';
import { useLoadingIndicator } from '@/composables/useLoadingIndicator';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

const { resendVerificationEmail, loading } = useAuth();
const { toast } = useToast();
const { start, finish } = useLoadingIndicator();

const handleResendEmail = async () => {
  try {
    start();
    const { error: resendError } = await resendVerificationEmail();
    
    if (resendError) {
      toast({
        title: 'Error',
        description: resendError.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Email Sent',
      description: 'A new verification email has been sent to your inbox.',
      variant: 'success',
    });
  } catch (e: any) {
    toast({
      title: 'Error',
      description: e.message || 'Failed to resend verification email',
      variant: 'destructive',
    });
  } finally {
    finish();
  }
};
</script>

<template>
  <div class="space-y-6 rounded-lg border border-border bg-card p-6 shadow-md sm:p-8 md:p-10">
    <div class="space-y-4 text-center">
      <Icon name="ph:check-circle-fill" class="text-success mx-auto size-16" />
      
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
        <UiButton class="w-full sm:w-auto" @click="navigateTo('/auth/login')">
          Continue to Login
        </UiButton>
      </div>

      <p class="pt-4 text-xs text-muted-foreground">
        Didn't receive the email? Check your spam folder or
        <button 
          class="text-primary hover:underline" 
          :disabled="loading"
          @click="handleResendEmail"
        >
          click here to resend
        </button>
      </p>
    </div>
  </div>
</template>

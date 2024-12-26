<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useToast } from '@/composables/useToast';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

const route = useRoute();
const { toast } = useToast();
const { start, finish } = useLoadingIndicator();
const { confirmEmailVerification, loading } = useAuth();

// State variables
const isConfirming = ref(true);
const errorMessage = ref('');

onMounted(async () => {
  try {
    start();
    // Check if we have error parameters in the URL
    const error = route.query.error;
    const errorDescription = route.query.error_description;

    if (error) {
      isConfirming.value = false;
      errorMessage.value = errorDescription?.toString().replace(/\+/g, ' ') || 'Verification failed';
      toast({
        title: 'Verification Failed',
        description: errorMessage.value,
        variant: 'destructive',
      });
      return;
    }

    // Check if we have a confirmation token
    const token = route.hash;
    if (!token) {
      isConfirming.value = false;
      errorMessage.value = 'No verification token found';
      toast({
        title: 'Verification Failed',
        description: 'No verification token found',
        variant: 'destructive',
      });
      return;
    }

    const { error: verificationError } = await confirmEmailVerification(token);
    
    if (verificationError) {
      isConfirming.value = false;
      errorMessage.value = verificationError.message;
      toast({
        title: 'Verification Failed',
        description: verificationError.message,
        variant: 'destructive',
      });
      return;
    }

    // Successful confirmation
    isConfirming.value = false;
    toast({
      title: 'Email Verified',
      description: 'Your email has been successfully verified. You can now log in.',
      variant: 'success',
    });

    // Redirect to login after a short delay
    setTimeout(() => {
      navigateTo('/auth/login');
    }, 2000);
  } catch (e: any) {
    isConfirming.value = false;
    errorMessage.value = e.message || 'An error occurred during verification';
    toast({
      title: 'Verification Failed',
      description: errorMessage.value,
      variant: 'destructive',
    });
  } finally {
    finish();
  }
});
</script>

<template>
  <div class="space-y-6 rounded-lg border border-border bg-card p-6 shadow-md sm:p-8 md:p-10">
    <div class="space-y-4 text-center">
      <div v-if="isConfirming">
        <UiSpinner class="mx-auto size-16" />
        <h1 class="mt-4 text-2xl font-bold">Verifying Your Email</h1>
        <p class="text-muted-foreground">Please wait while we verify your email address...</p>
      </div>

      <div v-else>
        <Icon
          :name="errorMessage ? 'ph:x-circle-fill' : 'ph:check-circle-fill'"
          :class="[
            'mx-auto size-16',
            errorMessage ? 'text-destructive' : 'text-success'
          ]"
        />
        
        <h1 class="mt-4 text-2xl font-bold">
          {{ errorMessage ? 'Verification Failed' : 'Email Verified' }}
        </h1>
        
        <p class="text-muted-foreground">
          {{ errorMessage || 'Your email has been successfully verified. Redirecting to login...' }}
        </p>

        <div class="pt-4">
          <UiButton
            class="w-full sm:w-auto"
            :variant="errorMessage ? 'destructive' : 'default'"
            @click="navigateTo('/auth/login')"
          >
            {{ errorMessage ? 'Try Again' : 'Continue to Login' }}
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseClient } from '#imports';

definePageMeta({
  layout: 'auth',
  middleware: 'guest',
});

const route = useRoute();
const supabase = useSupabaseClient();
const { toast } = useToast();

// State variables
const isConfirming = ref(true);
const errorMessage = ref('');

onMounted(async () => {
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

  // Check if we have a confirmation code in the URL
  if (route.fullPath.includes('#access_token=')) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(route.fullPath);
      
      if (error) {
        console.error('Email confirmation error:', error.message);
        isConfirming.value = false;
        errorMessage.value = error.message;
        return;
      }

      // Successful confirmation
      isConfirming.value = false;
      toast({
        title: 'Email Verified',
        description: 'Your email has been successfully verified.',
        variant: 'success',
      });
    } catch (err) {
      console.error('Confirmation process failed:', err);
      isConfirming.value = false;
      errorMessage.value = 'An unexpected error occurred';
    }
  } else {
    // No confirmation code, redirect to login
    navigateTo('/auth/login');
  }
});
</script>

<template>
  <div class="space-y-6 rounded-lg border border-border bg-card p-6 shadow-md sm:p-8 md:p-10">
    <!-- Confirming state -->
    <div v-if="isConfirming" class="space-y-4 text-center">
      <Icon name="ph:circle-notch" class="mx-auto size-16 animate-spin text-primary" />
      <p class="text-muted-foreground">Verifying your email...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="errorMessage" class="space-y-4 text-center">
      <Icon name="ph:warning-circle-fill" class="mx-auto size-16 text-destructive" />
      <h1 class="text-2xl font-bold text-destructive">Verification Failed</h1>
      <p class="text-sm text-muted-foreground">{{ errorMessage }}</p>
      <UiButton class="w-full sm:w-auto" @click="navigateTo('/auth/login')">
        Return to Login
      </UiButton>
    </div>

    <!-- Success state -->
    <div v-else class="space-y-4 text-center">
      <Icon name="ph:check-circle-fill" class="text-success mx-auto size-16" />
      <h1 class="text-2xl font-bold">Email Verified!</h1>
      <p class="text-muted-foreground">
        Your email has been verified successfully.
      </p>
      <UiButton class="w-full sm:w-auto" @click="navigateTo('/auth/login')">
        Continue to Login
      </UiButton>
    </div>
  </div>
</template>

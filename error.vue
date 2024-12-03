<script lang="ts" setup>
defineProps({
  error: Object
});

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Oops! Something went wrong</h1>
      <p class="mt-4 text-lg text-muted-foreground">{{ error?.message || 'An error occurred' }}</p>
      <UiButton class="mt-8" @click="handleError">
        Back to Home
      </UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from '~/composables/useToast';
import { ConfigProvider } from 'radix-vue';
const useIdFunction = () => useId() || '';
const { checkSession, error } = useAuth();
const { toast } = useToast();

// Check session when app mounts
onMounted(async () => {
  const isValid = await checkSession();
  if (!isValid && error.value) {
    toast({
      title: 'Session Error',
      description: error.value,
      variant: 'destructive',
    });
  }
});
</script>
<template>
  <div>
    <ConfigProvider :use-id="useIdFunction">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
    <UiToastToaster />
    
  </div>
</template>

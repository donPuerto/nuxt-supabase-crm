<script lang="ts" setup>
import { ConfigProvider } from 'radix-vue';
const useIdFunction = () => useId() || '';
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

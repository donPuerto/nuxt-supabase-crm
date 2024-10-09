<script lang="ts" setup>
import { ConfigProvider } from 'radix-vue';
const useIdFunction = () => useId() || '';
</script>
<template>
  <div>
    <ConfigProvider :use-id="useIdFunction">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>
    
  </div>
</template>

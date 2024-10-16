<!-- pages/index.vue -->
<script setup>
import { ref, onMounted } from 'vue';

const containerHeight = ref('100vh');

onMounted(() => {
  // Adjust for any potential viewport height issues on mobile browsers
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  containerHeight.value = 'calc(var(--vh, 1vh) * 100)';

  // Update on resize
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    containerHeight.value = 'calc(var(--vh, 1vh) * 100)';
  });
});
</script>

<template>
  <div 
    class="bg-background text-foreground overflow-hidden"
    :style="{ height: containerHeight }"
  >
    <div class="h-full flex flex-col p-4 sm:p-6 md:p-8">
    
      <div class="flex-grow overflow-hidden">
        <KanbanBoard class="h-full" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here if needed */
</style>

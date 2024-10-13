<script setup lang="ts">

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 24,
  },
  className: {
    type: String,
    default: '',
  },
});

const componentName = computed(() => {
  return props.name
    .split('-')
    .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
});

const IconComponent = computed(() => resolveComponent(componentName.value));
</script>

<template>
  <component :is="IconComponent" :size="size" :class="className" />
</template>

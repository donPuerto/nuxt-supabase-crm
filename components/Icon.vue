<script lang="ts">
import { defineComponent, ref, onMounted, markRaw } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
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
  },
  setup(props) {
    const iconComponent = ref(null);

    onMounted(async () => {
      try {
        const module = await import(`./icons/${props.name}Icon.vue`);
        iconComponent.value = markRaw(module.default);
      } catch (error) {
        console.error(`Failed to load icon: ${props.name}`, error);
      }
    });

    return { iconComponent };
  },
});
</script>
  
<template>
  <component :is="iconComponent" :size="size" :class="className" />
</template>

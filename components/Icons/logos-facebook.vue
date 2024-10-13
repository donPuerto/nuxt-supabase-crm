<script lang="ts">
export default {
  name: 'LogosFacebook',
  props: {
    size: {
      type: [Number, String],
      default: 24,
    },
    className: {
      type: String,
      default: '',
    },
  },
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :class="className"
    viewBox="0 0 256 256"
  >
    <!-- SVG path data -->
  </svg>
</template>

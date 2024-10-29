<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading">
    <USkeleton class="w-full h-10" />
  </div>

  <slot v-else />
</template>

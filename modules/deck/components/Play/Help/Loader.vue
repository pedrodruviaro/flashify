<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="flex justify-end">
    <USkeleton class="w-32 h-8" />
  </div>

  <slot v-else />
</template>

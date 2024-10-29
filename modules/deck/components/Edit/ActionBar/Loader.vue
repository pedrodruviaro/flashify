<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div
    v-if="props.loading"
    class="flex items-center gap-2 flex-wrap justify-between mb-4"
  >
    <USkeleton class="w-52 h-7" />
    <USkeleton class="w-44 h-8" />
  </div>
  <slot v-else />
</template>

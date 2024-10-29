<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="grid gap-2">
    <USkeleton class="w-52 h-6" />
    <USkeleton class="w-full h-14" />
    <USkeleton class="w-full h-24" />
    <USkeleton class="w-40 h-8" />
  </div>

  <slot v-else />
</template>

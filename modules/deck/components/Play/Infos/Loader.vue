<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="grid gap-5 md:grid-cols-2">
    <USkeleton class="w-full h-44" />
    <USkeleton class="w-full h-44" />
  </div>

  <slot v-else />
</template>

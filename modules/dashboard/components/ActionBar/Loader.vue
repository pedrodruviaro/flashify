<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div
    v-if="props.loading"
    class="grid gap-4 border px-6 py-4 rounded-lg border-stone-100"
  >
    <USkeleton class="w-44 h-8" />

    <div class="flex items-center flex-wrap gap-2 justify-between">
      <USkeleton class="w-32 h-8" />
      <USkeleton class="w-60 h-8" />
    </div>
  </div>

  <slot v-else />
</template>

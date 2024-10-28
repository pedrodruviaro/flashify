<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div
    v-if="props.loading"
    class="flex flex-col gap-2 md:flex-row md:items-center"
  >
    <USkeleton class="w-16 h-16 rounded-full" />

    <div class="grid gap-1">
      <USkeleton class="w-40 h-7" />
      <USkeleton class="w-20 h-4" />
    </div>
  </div>

  <slot v-else />
</template>

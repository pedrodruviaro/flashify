<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading" class="grid gap-5 md:grid-cols-2">
    <USkeleton
      v-for="i in 6"
      :key="`$-question-loader-${i}`"
      class="w-full h-48"
    />
  </div>

  <slot v-else />
</template>

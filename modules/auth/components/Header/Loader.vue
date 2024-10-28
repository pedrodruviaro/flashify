<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading">
    <header class="py-2.5 shadow-sm">
      <UContainer class="flex items-center gap-2 justify-between">
        <Logo />
        <USkeleton class="w-8 h-8" />
      </UContainer>
    </header>
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean
    amount?: number
  }>(),
  { amount: 6 }
)
</script>

<template>
  <div v-if="props.loading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <USkeleton
      v-for="i in props.amount"
      :key="`$-deckloader-${i}`"
      class="w-full h-64"
    />
  </div>

  <slot v-else />
</template>

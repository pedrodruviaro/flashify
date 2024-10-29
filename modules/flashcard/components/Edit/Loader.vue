<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean
    amount?: number
  }>(),
  { amount: 4 }
)
</script>

<template>
  <div v-if="props.loading" class="grid gap-4">
    <USkeleton
      class="w-full h-52"
      v-for="i in props.amount"
      :key="`$-cardedit-loader-${i}`"
    />
  </div>

  <slot v-else />
</template>

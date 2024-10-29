<script setup lang="ts">
const props = defineProps<{
  id: string
  question: string
}>()

const emits = defineEmits<{
  (e: "tap", id: string): void
}>()
</script>

<template>
  <UCard as="button" @click="emits('tap', props.id)">
    <p class="text-lg">{{ props.question }}</p>
  </UCard>
</template>

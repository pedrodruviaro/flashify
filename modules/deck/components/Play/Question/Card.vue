<script setup lang="ts">
const props = defineProps<{
  id: string
  question: string
  isCorrect?: boolean
  isIncorrect?: boolean
}>()

const emits = defineEmits<{
  (e: "tap", id: string): void
}>()
</script>

<template>
  <UCard
    as="button"
    @click="emits('tap', props.id)"
    :class="{
      'bg-green-50': props.isCorrect,
      'bg-red-50': props.isIncorrect,
    }"
  >
    <p class="text-lg">{{ props.question }}</p>
  </UCard>
</template>

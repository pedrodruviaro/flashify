<script setup lang="ts">
const emits = defineEmits<{
  (e: "need-help"): void
}>()
</script>

<template>
  <section class="flex justify-end">
    <UButton
      color="gray"
      variant="solid"
      label="Como jogar"
      icon="i-heroicons-question-mark-circle"
      trailing
      @click="emits('need-help')"
    />
  </section>
</template>

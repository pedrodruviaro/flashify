<script setup lang="ts">
const emits = defineEmits<{
  (e: "need-help"): void
}>()
</script>

<template>
  <section class="flex justify-between flex-wrap gap-2">
    <BaseTitle size="sm" light label="Comece a estudar" />

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

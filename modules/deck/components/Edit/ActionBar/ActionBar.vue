<script setup lang="ts">
const emits = defineEmits<{
  (e: "new-flashcard"): void
}>()
</script>

<template>
  <div class="flex items-center gap-2 flex-wrap justify-between mb-4">
    <BaseTitle size="sm" label="Gerencie as perguntas" />
    <UButton
      label="Adicionar pergunta"
      icon="i-heroicons-plus"
      trailing
      @click="emits('new-flashcard')"
    />
  </div>
</template>

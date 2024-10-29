<script setup lang="ts">
const emits = defineEmits<{
  (e: "close"): void
  (e: "confirm"): void
}>()
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <BaseTitle size="sm" center light label="Deseja realmente sair?" />
      </template>

      <div class="flex items-center flex-wrap gap-4 justify-center">
        <UButton
          tabindex="0"
          variant="outline"
          label="Voltar"
          @click="emits('close')"
        />
        <UButton
          color="red"
          tabindex="0"
          label="Sim, desejo sair"
          @click="emits('confirm')"
        />
      </div>
    </UCard>
  </UModal>
</template>

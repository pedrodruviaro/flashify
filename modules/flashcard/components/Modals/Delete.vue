<script setup lang="ts">
const emit = defineEmits(["confirm", "close"])
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <BaseTitle size="sm" light label="Essa ação é irreversível" />
      </template>
      <template #default>
        <p>Deseja realmente apagar a pergunta?</p>

        <div class="flex flex-wrap gap-2 items-center mt-4">
          <UButton
            tabindex="0"
            label="Voltar"
            variant="outline"
            @click="emit('close')"
          />
          <UButton label="Confirmar" color="red" @click="emit('confirm')" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

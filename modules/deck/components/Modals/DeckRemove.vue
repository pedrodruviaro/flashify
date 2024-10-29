<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  (e: "confirm"): void
}>()

const isOpen = defineModel<boolean>("isOpen")
</script>

<template>
  <Teleport to="body">
    <UModal prevent-close v-model:model-value="isOpen">
      <UCard>
        <template #header>
          <UBadge
            class="mb-4 mx-auto max-w-max block"
            color="red"
            variant="soft"
            >Essa ação é irreversível</UBadge
          >
          <BaseTitle
            size="md"
            as="h3"
            center
            label="Deseja realmente apagar esse deck?"
          />
        </template>

        <div class="flex gap-4 justify-center items-center flex-wrap">
          <UButton
            label="Voltar"
            variant="outline"
            @click="isOpen = false"
            :disabled="props.loading"
          />
          <UButton
            label="Confirmar"
            color="red"
            @click="emits('confirm')"
            :loading="props.loading"
          />
        </div>
      </UCard>
    </UModal>
  </Teleport>
</template>

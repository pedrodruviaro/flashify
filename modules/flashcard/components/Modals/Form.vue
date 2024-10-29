<script setup lang="ts">
export type ModalTypeAction = "create" | "edit"

const props = withDefaults(
  defineProps<{
    loading: boolean
    action?: ModalTypeAction
  }>(),
  { action: "create" }
)

const emits = defineEmits<{
  (e: "submited"): void
}>()

const question = defineModel<string>("question")
const answer = defineModel<string>("answer")
const open = defineModel<boolean>("open")

const modalTitle = computed(() => {
  return props.action === "create" ? "Crie sua pergunta" : "Edite sua pergunta"
})

const buttonLabel = computed(() => {
  return props.action === "create" ? "Criar" : "Editar"
})

const handleSubmit = (event: Event) => emits("submited")
</script>

<template>
  <Teleport to="body">
    <UModal prevent-close v-model:model-value="open">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <BaseTitle size="sm" light :label="modalTitle" />
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="open = false"
            />
          </div>
        </template>

        <form @submit.prevent="handleSubmit" class="space-y-2">
          <UFormGroup label="Pergunta" required>
            <UTextarea :rows="3" v-model="question" tabindex="0" autofocus />
          </UFormGroup>

          <UFormGroup label="Resposta" required>
            <UTextarea :rows="10" v-model="answer" />
          </UFormGroup>

          <UButton
            :label="buttonLabel"
            type="submit"
            :loading="props.loading"
          />
        </form>
      </UCard>
    </UModal>
  </Teleport>
</template>

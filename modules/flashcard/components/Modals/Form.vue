<script setup lang="ts">
import { z } from "zod"

const schema = z.object({
  question: z.string().min(2, "Insira sua pergunta completa"),
  answer: z.string().min(2, "Uma pergunta precisa de uma resposta"),
})

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

const localState = reactive({
  question: question.value,
  answer: answer.value,
})

const modalTitle = computed(() => {
  return props.action === "create" ? "Crie sua pergunta" : "Edite sua pergunta"
})

const buttonLabel = computed(() => {
  return props.action === "create" ? "Criar" : "Editar"
})

const handleSubmit = () => {
  question.value = localState.question
  answer.value = localState.answer
  emits("submited")
}

watchEffect(() => {
  localState.question = question.value
  localState.answer = answer.value

  if (open.value === false) {
    localState.answer = ""
    localState.question = ""
  }
})
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

        <UForm
          :schema="schema"
          :state="localState"
          @submit.prevent="handleSubmit"
          class="space-y-2"
        >
          <UFormGroup label="Pergunta" name="question" required>
            <UTextarea
              :rows="3"
              v-model="localState.question"
              tabindex="0"
              autofocus
            />
          </UFormGroup>

          <UFormGroup label="Resposta" name="answer" required>
            <UTextarea :rows="10" v-model="localState.answer" />
          </UFormGroup>

          <UButton
            :label="buttonLabel"
            type="submit"
            :loading="props.loading"
          />
        </UForm>
      </UCard>
    </UModal>
  </Teleport>
</template>

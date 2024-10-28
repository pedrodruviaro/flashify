<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

const props = withDefaults(
  defineProps<{
    question: string
    answer: string
    action?: "create" | "edit"
  }>(),
  { action: "create" }
)

const emits = defineEmits([
  "update:question",
  "update:answer",
  "success",
  "close",
])

const modalTitle = computed(() => {
  return props.action === "create" ? "Crie sua pergunta" : "Edite sua pergunta"
})

const buttonLabel = computed(() => {
  return props.action === "create" ? "Criar" : "Editar"
})

// Validation
const schema = z.object({
  localQuestion: z.string().min(5, "Pelo menos 5 caracteres são necessários"),
  localAnswer: z.string().min(2, "Uma questão deve ter uma resposta"),
})

type Schema = z.output<typeof schema>

const state = ref({
  localQuestion: props.question,
  localAnswer: props.answer,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  emits("close")
}
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <BaseTitle size="sm" light :label="modalTitle" />
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            @click="emits('close')"
          />
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        @submit.prevent="onSubmit"
        class="space-y-2"
      >
        <UFormGroup label="Pergunta" name="localQuestion" required>
          <UTextarea
            :rows="3"
            v-model="state.localQuestion"
            @input="emits('update:question', state.localQuestion)"
            tabindex="0"
            autofocus
          />
        </UFormGroup>

        <UFormGroup label="Resposta" name="localAnswer" required>
          <UTextarea
            :rows="10"
            v-model="state.localAnswer"
            @input="emits('update:answer', state.localAnswer)"
          />
        </UFormGroup>
        <UButton :label="buttonLabel" type="submit" />
      </UForm>
    </UCard>
  </UModal>
</template>

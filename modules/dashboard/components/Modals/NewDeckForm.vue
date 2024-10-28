<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

const props = defineProps<{
  title: string
  description: string
}>()

const emits = defineEmits([
  "update:title",
  "update:description",
  "success",
  "close",
])

// Validation
const schema = z.object({
  localTitle: z.string().min(5, "Informe o título"),
  localDescription: z.string().min(2, "Insira uma descrição"),
})

type Schema = z.output<typeof schema>

const state = ref({
  localTitle: props.title,
  localDescription: props.description,
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
          <BaseTitle size="sm" light label="Crie seu deck" />
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
        <UFormGroup label="Título" name="localTitle" required>
          <UInput
            v-model="state.localTitle"
            tabindex="0"
            autofocus
            @input="emits('update:title', state.localTitle)"
          />
        </UFormGroup>

        <UFormGroup label="Descrição" name="localDescription" required>
          <UTextarea
            :rows="10"
            v-model="state.localDescription"
            @input="emits('update:description', state.localDescription)"
          />
        </UFormGroup>
        <UButton label="Criar" icon="i-heroicons-plus" trailing type="submit" />
      </UForm>
    </UCard>
  </UModal>
</template>

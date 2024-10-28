<script setup lang="ts">
import type { ZodFormattedError } from "zod"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

const props = defineProps<{
  loading: boolean
  errors?: ZodFormattedError<Deck>
}>()

const isOpen = defineModel<boolean>("isOpen")
const title = defineModel<string>("title")
const description = defineModel<string>("description")

const emits = defineEmits<{
  (e: "create"): void
}>()

const handleSubmit = async () => {
  emits("create")
}
</script>

<template>
  <Teleport to="body">
    <UModal prevent-close v-model:model-value="isOpen">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <BaseTitle size="sm" light label="Crie seu deck" />
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="isOpen = false"
            />
          </div>
        </template>

        <form @submit.prevent="handleSubmit" class="space-y-2">
          <UFormGroup label="Título" required>
            <UInput v-model="title" tabindex="0" autofocus />
            <ValidationMessage v-if="props.errors?.title">{{
              props.errors.title._errors[0]
            }}</ValidationMessage>
          </UFormGroup>

          <UFormGroup label="Descrição" required>
            <UTextarea :rows="10" v-model="description" />
            <ValidationMessage v-if="props.errors?.description">{{
              props.errors.description._errors[0]
            }}</ValidationMessage>
          </UFormGroup>

          <UButton
            label="Criar"
            icon="i-heroicons-plus"
            trailing
            type="submit"
            :loading="props.loading"
          />
        </form>
      </UCard>
    </UModal>
  </Teleport>
</template>

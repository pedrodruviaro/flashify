<script setup lang="ts">
import type { ZodFormattedError } from "zod"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

const props = defineProps<{
  loading: boolean
  errors?: ZodFormattedError<Deck>
}>()

const emits = defineEmits<{
  (e: "save"): void
  (e: "play"): void
}>()

const title = defineModel<string>("title")
const description = defineModel<string>("description")
</script>

<template>
  <section>
    <div class="flex justify-end mb-2">
      <UButton
        label="Jogar"
        icon="i-heroicons-play"
        size="lg"
        variant="outline"
        color="green"
        @click="emits('play')"
      />
    </div>

    <BaseTitle
      as="h1"
      size="sm"
      label="Informações sobre o deck"
      class="mb-2"
    />
    <form class="space-y-2">
      <UFormGroup label="Título" required>
        <UInput placeholder="Questões sobre programação" v-model="title" />
        <ValidationMessage v-if="props.errors?.title">{{
          props.errors.title._errors[0]
        }}</ValidationMessage>
      </UFormGroup>

      <UFormGroup label="Descrição" required>
        <UTextarea
          :rows="3"
          placeholder="Uma descrição sobre o assunto"
          v-model="description"
        />
        <ValidationMessage v-if="props.errors?.description">{{
          props.errors.description._errors[0]
        }}</ValidationMessage>
      </UFormGroup>

      <UButton
        label="Salvar informações"
        variant="outline"
        icon="i-heroicons-pencil-square"
        trailing
        @click="emits('save')"
        :loading="props.loading"
      />
    </form>
  </section>
</template>

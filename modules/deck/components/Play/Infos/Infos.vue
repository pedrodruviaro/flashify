<script setup lang="ts">
import { dateFormate } from "~/helpers/dateFormat"

const props = defineProps<{
  date: Date
  title: string
  description: string
  numOfCards: number
  answered: number
  rightAnswers: number
}>()

const formatedDate = computed(() => {
  return dateFormate(props.date)
})

const numOfCardsLabel = computed(() => {
  return props.numOfCards === 1 ? "Pergunta" : "Perguntas"
})

const answeredLabel = computed(() => {
  return props.answered === 1 ? "Respondida" : "Respondidas"
})

const rightAnswersLabel = computed(() => {
  return props.rightAnswers === 1 ? "Acerto" : "Acertos"
})

const progress = computed(() => {
  return (100 * props.answered) / props.numOfCards
})
</script>

<template>
  <section class="grid gap-5 md:grid-cols-2">
    <UCard>
      <UBadge>Criado em {{ formatedDate }}</UBadge>
      <BaseTitle
        class="mt-4 mb-2"
        light
        as="h1"
        size="sm"
        :label="props.title"
      />
      <p class="text-stone-600">{{ props.description }}</p>
    </UCard>

    <UCard>
      <div class="grid gap-2">
        <UBadge color="white" size="lg"
          >{{ props.numOfCards }} {{ numOfCardsLabel }}</UBadge
        >
        <UBadge color="black" size="lg"
          >{{ props.answered }} {{ answeredLabel }}</UBadge
        >
        <UBadge color="emerald" size="lg"
          >{{ props.rightAnswers }} {{ rightAnswersLabel }}</UBadge
        >

        <UProgress :value="progress" indicator class="mt-2" />
        <span class="text-xs text-stone-500">Respondido</span>
      </div>
    </UCard>
  </section>
</template>

<script setup lang="ts">
import type { FlashcardListState } from "~/modules/flashcard/entities/Flashcard/Flashcard"

interface Item {
  label: string
  value: FlashcardListState
  icon?: string
}

const items: Item[] = [
  {
    label: "Não respondidas",
    value: "not-answered",
  },

  {
    label: "Respondidas",
    icon: "i-heroicons-check-16-solid",
    value: "answered",
  },
]

const emits = defineEmits<{
  (e: "change-tab", state: FlashcardListState): void
}>()

const handleChange = (index: number) => {
  const item = items[index]
  emits("change-tab", item.value)
}
</script>

<template>
  <div>
    <UTabs :items="items" @change="handleChange" />
  </div>
</template>

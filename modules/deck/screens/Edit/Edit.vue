<script setup lang="ts">
import HeadlineLoader from "~/modules/deck/components/Headline/Loader.vue"
import Headline from "~/modules/deck/components/Headline/Headline.vue"
import ActionBarLoader from "~/modules/deck/components/Edit/ActionBar/Loader.vue"
import ActionBar from "~/modules/deck/components/Edit/ActionBar/ActionBar.vue"
import FlashcardEditListLoader from "~/modules/flashcard/components/Edit/Loader.vue"
import FlashcardEditList from "~/modules/flashcard/components/Edit/List.vue"
import FlashcardEditCard from "~/modules/flashcard/components/Edit/Card.vue"
import FlashcardEditListEmpty from "~/modules/flashcard/components/Edit/Empty.vue"
import LazyFlashcardModalDelete from "~/modules/flashcard/components/Modals/Delete.vue"
import LazyFlashcardModalForm from "~/modules/flashcard/components/Modals/Form.vue"
import LazyModalDeckRemove from "~/modules/deck/components/Modals/DeckRemove.vue"
import { useDeck } from "~/modules/deck/composables/useDeck"
import { useDeckEdit } from "~/modules/deck/composables/useDeckEdit"
import { useFlashcardCreate } from "~/modules/flashcard/composables/useFlashcardCreate"
import { useFlashcardRemove } from "~/modules/flashcard/composables/useFlaschardRemove"
import { useFlashcardEdit } from "~/modules/flashcard/composables/useFlashcardEdit"
import { useDeckRemove } from "~/modules/deck/composables/useDeckRemove"
import type { ModalTypeAction } from "~/modules/flashcard/components/Modals/Form.vue"
import type { Flashcard } from "~/modules/flashcard/entities/Flashcard/Flashcard"

// Deck
const route = useRoute()
const deckId = computed(() => route.params.id as string)

const { user } = useUser()

const isDeleteDeckModalOpen = ref(false)

const {
  loading: loadingDeck,
  deck,
  getDeck,
} = useDeck({ user, id: deckId.value })

const hasFlashcards = computed(() => {
  return (
    deck.value && deck?.value.flashcards && deck.value.flashcards.length > 0
  )
})

const {
  loading: loadingEditDeck,
  title,
  description,
  errors,
  edit,
} = useDeckEdit({ deck })

const { loading: laodingRemoveDeck, remove: removeDeck } = useDeckRemove({
  deck,
})

// Flashcards
const isModalOpen = ref(false)

const answer = ref("")
const question = ref("")
const flashcardIdToEdit = ref()
const modalAction = ref<ModalTypeAction>("create")

watchEffect(() => {
  if (isModalOpen.value === false) {
    answer.value = ""
    question.value = ""
    flashcardIdToEdit.value = undefined
    modalAction.value = "create"
  }
})

const { loading: loadingCreate, create } = useFlashcardCreate({ deck })
const { loading: loadingEdit, edit: editFlashcard } = useFlashcardEdit()

const handleQuestionForm = async () => {
  if (modalAction.value === "create") {
    const createdFlashcard = await create({
      question: question.value,
      answer: answer.value,
    })

    if (createdFlashcard) {
      isModalOpen.value = false
      deck.value?.flashcards.unshift(createdFlashcard)

      answer.value = ""
      question.value = ""
    }
    return
  }

  // Edit
  const editedFlashcard = await editFlashcard(flashcardIdToEdit.value, {
    question: question.value,
    answer: answer.value,
  })

  if (!editedFlashcard) return

  isModalOpen.value = false

  const idx = deck.value?.flashcards.findIndex(
    (f) => f.id === editedFlashcard.id
  )

  if (idx !== undefined && deck.value?.flashcards) {
    const newArr = [...deck.value.flashcards]

    newArr[idx] = editedFlashcard
    deck.value.flashcards = [...newArr]
  }
}

const handleEditQuestion = async (flashcard: Flashcard) => {
  modalAction.value = "edit"
  isModalOpen.value = true
  answer.value = flashcard.answer
  question.value = flashcard.question

  flashcardIdToEdit.value = flashcard.id
}

const { remove } = useFlashcardRemove()
const modal = useModal()

const handleRemoveQuestion = async (id: string) => {
  modal.open(LazyFlashcardModalDelete, {
    onConfirm: async () => {
      await remove(id)
      modal.close()

      const newFlaschards = deck.value?.flashcards.filter((f) => f.id !== id)
      if (newFlaschards && deck.value?.flashcards) {
        deck.value.flashcards = newFlaschards
      }
    },
    onClose: () => modal.close(),
  })
}

onMounted(() => getDeck())
</script>

<template>
  <div class="space-y-10 md:space-y-16">
    <HeadlineLoader :loading="loadingDeck">
      <Headline
        v-model:title="title"
        v-model:description="description"
        :loading="loadingEditDeck"
        :errors="errors"
        @save="edit"
      />
    </HeadlineLoader>

    <section>
      <ActionBarLoader :loading="loadingDeck">
        <ActionBar @new-flashcard="isModalOpen = true" />
      </ActionBarLoader>

      <FlashcardEditListLoader :loading="loadingDeck">
        <FlashcardEditList v-if="hasFlashcards" v-auto-animate>
          <FlashcardEditCard
            v-for="card in deck?.flashcards"
            :key="card.id"
            :id="card.id"
            :question="card.question"
            :answer="card.answer"
            @edit="handleEditQuestion(card)"
            @remove="handleRemoveQuestion"
          />
        </FlashcardEditList>

        <FlashcardEditListEmpty v-else />
      </FlashcardEditListLoader>
    </section>

    <UCard>
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <BaseTitle light size="sm" label="Zona perigosa" />
        <UButton
          color="red"
          label="Apagar esse Deck"
          icon="i-heroicons-trash"
          @click="isDeleteDeckModalOpen = true"
        />
      </div>
    </UCard>

    <LazyFlashcardModalForm
      v-model:open="isModalOpen"
      v-model:question="question"
      v-model:answer="answer"
      :action="modalAction"
      :loading="loadingCreate || loadingEdit"
      @submited="handleQuestionForm"
    />

    <LazyModalDeckRemove
      v-model:isOpen="isDeleteDeckModalOpen"
      :loading="laodingRemoveDeck"
      @confirm="removeDeck"
    />
  </div>
</template>

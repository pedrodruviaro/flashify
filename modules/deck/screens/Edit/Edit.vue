<script setup lang="ts">
import HeadlineLoader from "~/modules/deck/components/Headline/Loader.vue"
import Headline from "~/modules/deck/components/Headline/Headline.vue"
import FlashcardEditListLoader from "~/modules/flashcard/components/Edit/Loader.vue"
import FlashcardEditList from "~/modules/flashcard/components/Edit/List.vue"
import FlashcardEditCard from "~/modules/flashcard/components/Edit/Card.vue"
import FlashcardEditListEmpty from "~/modules/flashcard/components/Edit/Empty.vue"
import LazyFlashcardModalDelete from "~/modules/flashcard/components/Modals/Delete.vue"
import LazyFlashcardModalForm from "~/modules/flashcard/components/Modals/Form.vue"
import { useDeck } from "~/modules/deck/composables/useDeck"
import { useDeckEdit } from "~/modules/deck/composables/useDeckEdit"
import { useFlashcardCreate } from "~/modules/flashcard/composables/useFlashcardCreate"
import type { ModalTypeAction } from "~/modules/flashcard/components/Modals/Form.vue"
import { useFlashcardRemove } from "~/modules/flashcard/composables/useFlaschardRemove"

// Deck
// @ TODO -> redirect if deckId doesnt exist (?)
const route = useRoute()
const deckId = computed(() => route.params.id as string)

const { user } = useUser()

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

// Flashcards
const isModalOpen = ref(false)

const answer = ref("")
const question = ref("")
const modalAction = ref<ModalTypeAction>("create")

const { loading: loadingCreate, create } = useFlashcardCreate({ deck })

// const { loading: loadingEdit, edit } = useQuestionEdit()

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

  // edit logic
}

const handleEditQuestion = () => {}

const { loading: loadingRemove, remove } = useFlashcardRemove()

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
  <!-- 
  @TODO -> add CTA to remove entire deck 
  @TODO -> adicionar validação ao form de criação
  -->
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
      <!-- ADD LOADER E COMPONENTIZAR -->
      <div class="flex items-center gap-2 flex-wrap justify-between mb-4">
        <BaseTitle size="sm" label="Gerencie as perguntas" />
        <UButton
          label="Adicionar pergunta"
          icon="i-heroicons-plus"
          trailing
          @click="isModalOpen = true"
        />
      </div>

      <FlashcardEditListLoader :loading="loadingDeck">
        <FlashcardEditList v-if="hasFlashcards" v-auto-animate>
          <FlashcardEditCard
            v-for="card in deck?.flashcards"
            :key="card.id"
            :id="card.id"
            :question="card.question"
            :answer="card.answer"
            @edit="handleEditQuestion"
            @remove="handleRemoveQuestion"
          />
        </FlashcardEditList>

        <FlashcardEditListEmpty v-else />
      </FlashcardEditListLoader>
    </section>

    <LazyFlashcardModalForm
      v-model:open="isModalOpen"
      v-model:question="question"
      v-model:answer="answer"
      :action="modalAction"
      :loading="loadingCreate"
      @submited="handleQuestionForm"
    />
  </div>
</template>

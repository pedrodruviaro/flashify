<script setup lang="ts">
import HeadlineLoader from "~/modules/deck/components/Headline/Loader.vue"
import Headline from "~/modules/deck/components/Headline/Headline.vue"
import QuestionCardEditListLoader from "~/modules/deck/components/Question/CardEdit/Loader.vue"
import QuestionCardEditList from "~/modules/deck/components/Question/CardEdit/List.vue"
import QuestionCardEdit from "~/modules/deck/components/Question/CardEdit/CardEdit.vue"

import LazyModalDeleteCard from "~/modules/deck/components/Modals/DeleteCard.vue"
import LazyModalQuestionForm from "~/modules/deck/components/Modals/QuestionForm.vue"
import { useDeck } from "~/modules/deck/composables/useDeck"
import { useDeckEdit } from "~/modules/deck/composables/useDeckEdit"

// Deck
const route = useRoute()
const deckId = computed(() => route.params.id as string)

const { user } = useUser()
const {
  loading: loadingDeck,
  deck,
  getDeck,
} = useDeck({ user, id: deckId.value })

const {
  loading: loadingEditDeck,
  title,
  description,
  errors,
  edit,
} = useDeckEdit({ deck })

// Question

// const { loading: loadingCreate, question, answer, create } = useQuestionCreate()
// const { loading: loadingEdit, question, answer, edit } = useQuestionEdit(id)
// const { loading: loadingDelete, remove } = useQuestionRemove(id)

// const question = ref("")
// const answer = ref("")

// const modal = useModal()

// const handleAddQuestion = async () => {
//   modal.open(LazyModalQuestionForm, {
//     question: question.value,
//     answer: answer.value,
//     "onUpdate:question": (val: string) => (question.value = val),
//     "onUpdate:answer": (val: string) => (answer.value = val),
//     onSuccess: () => {
//       // CREATE QUESTION LOGIC
//       modal.close()
//       question.value = ""
//       answer.value = ""
//     },
//     onClose: () => modal.close(),
//   })
// }

// const handleEditQuestion = async (id: string) => {
//   modal.open(LazyModalQuestionForm, {
//     action: "edit",
//     question: question.value,
//     answer: answer.value,
//     "onUpdate:question": (val: string) => (question.value = val),
//     "onUpdate:answer": (val: string) => (answer.value = val),
//     onSuccess: () => {
//       // EDIT QUESTION LOGIC (id)
//       modal.close()
//       question.value = ""
//       answer.value = ""
//     },
//     onClose: () => modal.close(),
//   })
// }

// const handleRemoveQuestion = async (id: string) => {
//   modal.open(LazyModalDeleteCard, {
//     onSuccess: () => {
//       // REMOVE QUESTION LOGIC
//       modal.close()
//     },
//     onClose: () => modal.close(),
//   })
// }

onMounted(() => getDeck())
</script>

<template>
  <!-- 
  @TODO -> add CTA to remove entire deck 
  -->
  <div class="space-y-8 md:space-y-10">
    <HeadlineLoader :loading="loadingDeck">
      <Headline
        v-model:title="title"
        v-model:description="description"
        :loading="loadingEditDeck"
        :errors="errors"
        @save="edit"
      />
    </HeadlineLoader>

    <UDivider icon="i-heroicons-academic-cap" />

    <!-- <section>
      <div class="flex items-center gap-2 flex-wrap justify-between mb-4">
        <BaseTitle size="sm" label="Gerencie as perguntas" />
        <UButton
          label="Adicionar pergunta"
          icon="i-heroicons-plus"
          trailing
          @click="handleAddQuestion"
        />
      </div>

      <QuestionCardEditListLoader :loading="false">
        <QuestionCardEditList>
          <QuestionCardEdit
            v-for="card in cards"
            :key="card.id"
            :id="card.id"
            :question="card.question"
            :answer="card.answer"
            @edit="handleEditQuestion"
            @remove="handleRemoveQuestion"
          />
        </QuestionCardEditList>
      </QuestionCardEditListLoader>
    </section> -->
  </div>
</template>

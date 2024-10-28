<script setup lang="ts">
import Headline from "~/modules/deck/components/Headline/Headline.vue"
import QuestionCardEditListLoader from "~/modules/deck/components/Question/CardEdit/Loader.vue"
import QuestionCardEditList from "~/modules/deck/components/Question/CardEdit/List.vue"
import QuestionCardEdit from "~/modules/deck/components/Question/CardEdit/CardEdit.vue"

import ModalDeleteCard from "~/modules/deck/components/Modals/DeleteCard.vue"
import ModalQuestionForm from "~/modules/deck/components/Modals/QuestionForm.vue"

const deck = {
  id: 1,
  title: "Typescript",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
  cards: 24,
  createdAt: "10/10/10",
}

const cards = [
  {
    id: "12313",
    question: "Lorem ipsum dolor amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien.",
  },
  {
    id: "12313123123",
    question: "Lorem ipsum dolor amet2?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien.",
  },
  {
    id: "828282",
    question: "Lorem ipsum dolor amet3?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien.",
  },
]

// Deck
const title = ref("")
const description = ref("")

const handleSaveDeckInformations = async () => {}

// Question

// const { loading: loadingCreate, question, answer, create } = useQuestionCreate()
// const { loading: loadingEdit, question, answer, edit } = useQuestionEdit(id)
// const { loading: loadingDelete, remove } = useQuestionRemove(id)

const question = ref("")
const answer = ref("")

const modal = useModal()

const handleAddQuestion = async () => {
  modal.open(ModalQuestionForm, {
    question: question.value,
    answer: answer.value,
    "onUpdate:question": (val: string) => (question.value = val),
    "onUpdate:answer": (val: string) => (answer.value = val),
    onSuccess: () => {
      // CREATE QUESTION LOGIC
      modal.close()
      question.value = ""
      answer.value = ""
    },
    onClose: () => modal.close(),
  })
}

const handleEditQuestion = async (id: string) => {
  modal.open(ModalQuestionForm, {
    action: "edit",
    question: question.value,
    answer: answer.value,
    "onUpdate:question": (val: string) => (question.value = val),
    "onUpdate:answer": (val: string) => (answer.value = val),
    onSuccess: () => {
      // EDIT QUESTION LOGIC (id)
      modal.close()
      question.value = ""
      answer.value = ""
    },
    onClose: () => modal.close(),
  })
}

const handleRemoveQuestion = async (id: string) => {
  modal.open(ModalDeleteCard, {
    onSuccess: () => {
      // REMOVE QUESTION LOGIC
      modal.close()
    },
    onClose: () => modal.close(),
  })
}
</script>

<template>
  <!-- 
  @TODO -> add CTA to remove entire deck 
  -->
  <div class="space-y-8 md:space-y-10">
    <Headline
      v-model:title="title"
      v-model:description="description"
      @save="handleSaveDeckInformations"
    />
    <UDivider icon="i-heroicons-academic-cap" />

    <section>
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
    </section>
  </div>
</template>

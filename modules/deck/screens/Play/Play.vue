<script setup lang="ts">
import HelpLoader from "~/modules/deck/components/Play/Help/Loader.vue"
import Help from "~/modules/deck/components/Play/Help/Help.vue"
import InfosLoader from "~/modules/deck/components/Play/Infos/Loader.vue"
import Infos from "~/modules/deck/components/Play/Infos/Infos.vue"
import QuestionLoader from "~/modules/deck/components/Play/Question/Loader.vue"
import QuestionList from "~/modules/deck/components/Play/Question/List.vue"
import QuestionCard from "~/modules/deck/components/Play/Question/Card.vue"
import LazyPlayActions from "~/modules/deck/components/Modals/PlayActions.vue"
import { useDeck } from "~/modules/deck/composables/useDeck"
import type { Flashcard } from "~/modules/flashcard/entities/Flashcard/Flashcard"

// Deck
const route = useRoute()
const deckId = computed(() => route.params.id as string)
const { user } = useUser()

const { loading, deck, getDeck } = useDeck({ user, id: deckId.value })
onMounted(() => getDeck())

// Play
const answeredQuestions = ref<Flashcard[]>([])
const numOfAnswers = ref(0)
const rightAnswers = ref(0)

const modal = useModal()

const handleRespondQuestion = (isCorrect: boolean, card: Flashcard) => {
  numOfAnswers.value++
  if (isCorrect) rightAnswers.value++

  answeredQuestions.value.push(card)

  // remove card from deck.flashcards
  // update ui
  // insert into answeredQuestions array

  // apply vue-auto-animate on everthing
}

const handleShowAnswer = (card: Flashcard) => {
  modal.open(LazyPlayActions, {
    question: card.question,
    answer: card.answer,
    onCorrect: () => {
      handleRespondQuestion(true, card)
      modal.close()
    },
    onIncorret: () => {
      handleRespondQuestion(false, card)
      modal.close()
    },
    onClose: () => modal.close(),
  })
}
</script>

<template>
  <div class="space-y-10">
    <HelpLoader :loading="loading">
      <Help @need-help="() => console.log('* need help')" />
    </HelpLoader>

    <InfosLoader :loading="loading">
      <Infos
        v-if="deck"
        :date="deck?.createdAt"
        :title="deck?.title"
        :description="deck?.description"
        :num-of-cards="deck?.flashcards.length"
        :answered="numOfAnswers"
        :right-answers="rightAnswers"
      />
    </InfosLoader>

    <!-- TAB 
    const items = [
  {
    label: "Não respondidas",
  },

  {
    label: "Respondidas",
    icon: "i-heroicons-check-16-solid",
  },
]

  function onChange(index: number) {
      const item = items[index]
      console.log(`${item.label} was clicked!`)
    } 
        
    <div>
      <UTabs :items="items" @change="onChange" />
    </div>
    -->

    <QuestionLoader :loading="loading">
      <QuestionList>
        <QuestionCard
          v-for="card in deck?.flashcards"
          :key="card.id"
          :id="card.id"
          :question="card.question"
          @tap="handleShowAnswer(card)"
        />
      </QuestionList>
    </QuestionLoader>
  </div>
</template>

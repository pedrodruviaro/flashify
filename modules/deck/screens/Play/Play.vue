<script setup lang="ts">
import HelpLoader from "~/modules/deck/components/Play/Help/Loader.vue"
import Help from "~/modules/deck/components/Play/Help/Help.vue"
import InfosLoader from "~/modules/deck/components/Play/Infos/Loader.vue"
import Infos from "~/modules/deck/components/Play/Infos/Infos.vue"
import QuestionLoader from "~/modules/deck/components/Play/Question/Loader.vue"
import QuestionList from "~/modules/deck/components/Play/Question/List.vue"
import QuestionCard from "~/modules/deck/components/Play/Question/Card.vue"
import LazyPlayActions from "~/modules/deck/components/Modals/PlayActions.vue"
import TabsLoader from "~/modules/deck/components/Play/Tabs/Loader.vue"
import Tabs from "~/modules/deck/components/Play/Tabs/Tabs.vue"
import { useDeck } from "~/modules/deck/composables/useDeck"
import type {
  AnsweredFlashcard,
  Flashcard,
  FlashcardListState,
} from "~/modules/flashcard/entities/Flashcard/Flashcard"

// Deck
const route = useRoute()
const deckId = computed(() => route.params.id as string)
const { user } = useUser()

const { loading, deck, getDeck } = useDeck({ user, id: deckId.value })
onMounted(() => getDeck())

// Play
const answeredQuestions = ref<AnsweredFlashcard[]>([])
const numOfAnswers = ref(0)
const rightAnswers = ref(0)

const selectedList = ref<FlashcardListState>("not-answered")

const modal = useModal()
const handleRespondQuestion = (isCorrect: boolean, card: Flashcard) => {
  numOfAnswers.value++
  if (isCorrect) rightAnswers.value++

  answeredQuestions.value.push({ ...card, isCorrect })

  const newArr = deck.value?.flashcards.filter((f) => f.id !== card.id)
  if (deck.value && newArr) {
    deck.value.flashcards = newArr
  }
}

const handleShowAnswer = (card: Flashcard, showActions?: boolean) => {
  modal.open(LazyPlayActions, {
    question: card.question,
    answer: card.answer,
    hasActions: showActions,
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
        :num-of-cards="deck?.flashcards.length + answeredQuestions.length"
        :answered="numOfAnswers"
        :right-answers="rightAnswers"
      />
    </InfosLoader>

    <TabsLoader :loading="loading">
      <Tabs @change-tab="(list) => (selectedList = list)" />
    </TabsLoader>

    <QuestionLoader :loading="loading">
      <QuestionList v-show="selectedList === 'not-answered'" v-auto-animate>
        <QuestionCard
          v-for="card in deck?.flashcards"
          :key="card.id"
          :id="card.id"
          :question="card.question"
          @tap="handleShowAnswer(card)"
          v-show="deck?.flashcards.length && deck?.flashcards.length > 0"
        />
        <BaseTitle
          size="xs"
          light
          center
          v-show="deck?.flashcards.length === 0"
          class="col-span-2"
          label="Sem cards restantes"
        />
      </QuestionList>

      <QuestionList v-show="selectedList === 'answered'">
        <QuestionCard
          v-for="card in answeredQuestions"
          :key="card.id"
          :id="card.id"
          :question="card.question"
          :isCorrect="card.isCorrect"
          :isIncorrect="!card.isCorrect"
          @tap="handleShowAnswer(card, false)"
          v-show="answeredQuestions.length > 0"
        />
        <BaseTitle
          size="xs"
          light
          center
          label="Ainda não há respostas"
          class="col-span-2"
          v-show="answeredQuestions.length === 0"
        />
      </QuestionList>
    </QuestionLoader>
  </div>
</template>

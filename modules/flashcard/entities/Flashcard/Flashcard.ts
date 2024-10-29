export interface Flashcard {
  id: string
  question: string
  answer: string
  deckId: string
  createdAt: Date
}

export type FlashcardListState = "answered" | "not-answered"

export type AnsweredFlashcard = Flashcard & {
  isCorrect: boolean
}

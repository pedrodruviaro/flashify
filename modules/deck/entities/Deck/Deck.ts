import type { Flashcard } from "~/modules/flashcard/entities/Flashcard/Flashcard"

export interface Deck {
  id: string
  description: string
  title: string
  userId: string
  createdAt: Date
}

export type DeckVirtual = Deck & {
  flashcards: Flashcard[]
}

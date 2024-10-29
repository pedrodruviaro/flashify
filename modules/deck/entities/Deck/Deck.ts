import type { Flashcard } from "~/modules/flashcard/entities/Flashcard/Flashcard"

export interface Deck {
  id: string
  description: string
  title: string
  userId: string
  createdAt: Date
}

export interface DeckVirtual {
  id: string
  title: string
  description: string
  userId: string
  createdAt: Date
  flashcards: Flashcard[]
}

import type { Database } from "~/supabase/schema"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

export type DeckRow = Database["public"]["Tables"]["decks"]["Row"]
export type FlashcardRow = Database["public"]["Tables"]["flashcards"]["Row"]

export type ReadOneRow = DeckRow

export type ReadFullDeckRow = ReadOneRow & {
  flashcards: FlashcardRow[]
}

export type CreateOptions = Omit<Deck, "id" | "createdAt">

export interface GetFullDeckOptions {
  id: string
  userId: string
}

export type UpdateOptions = Partial<Deck>

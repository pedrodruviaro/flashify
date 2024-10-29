import type { Database } from "~/supabase/schema"
import type { Flashcard } from "~/modules/flashcard/entities/Flashcard/Flashcard"

export type ReadOneRow = Database["public"]["Tables"]["flashcards"]["Row"]

export interface CreateOptions {
  question: string
  answer: string
  deckId: string
}

export type UpdateOptions = Partial<Flashcard>

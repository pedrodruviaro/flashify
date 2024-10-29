import type { Database } from "~/supabase/schema"

export type ReadOneRow = Database["public"]["Tables"]["flashcards"]["Row"]

export interface CreateOptions {
  question: string
  answer: string
  deckId: string
}

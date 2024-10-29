import type { Flashcard } from "~/modules/flashcard/entities/Flashcard/Flashcard"
import type { ReadOneRow } from "./types"

export function createAdpater(data: ReadOneRow | null): Flashcard | null {
  if (!data) return null

  return {
    id: data.id,
    deckId: data.deck_id,
    question: data.question,
    answer: data.answer,
    createdAt: new Date(data.created_at),
  }
}

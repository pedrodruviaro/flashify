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

export function readAllAdapter(data: ReadOneRow[] | null): Flashcard[] | null {
  if (!data) return null

  const values = data.map((value) => {
    return {
      id: value.id,
      deckId: value.deck_id,
      question: value.question,
      answer: value.answer,
      createdAt: new Date(value.created_at),
    }
  })

  return values
}

export function readOneAdapter(data: ReadOneRow | null): Flashcard | null {
  if (!data) return null

  return {
    id: data.id,
    deckId: data.deck_id,
    question: data.question,
    answer: data.answer,
    createdAt: new Date(data.created_at),
  }
}

import type { Deck, DeckVirtual } from "~/modules/deck/entities/Deck/Deck"
import type { ReadFullDeckRow, ReadOneRow } from "./types"

export function readAllAdapter(data: ReadOneRow[] | null): Deck[] | null {
  if (!data) return null

  const values = data.map((value) => {
    return {
      id: value.id,
      description: value.description,
      title: value.title,
      userId: value.user_id,
      createdAt: new Date(value.created_at),
    }
  })

  return values
}

export function readFullDeckAdapter(
  data: ReadFullDeckRow | null
): DeckVirtual | null {
  if (!data) return null

  const flashcards = data.flashcards.map((card) => {
    return {
      id: card.id,
      deckId: card.deck_id,
      question: card.question,
      answer: card.answer,
      createdAt: new Date(card.created_at),
    }
  })

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
    flashcards,
  }
}

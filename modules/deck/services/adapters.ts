import type { Deck } from "~/modules/deck/entities/Deck/Deck"
import type { ReadOneRow } from "./types"

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

export function getDeckByIdAdapter(data: ReadOneRow | null): Deck | null {
  if (!data) return null

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    userId: data.user_id,
    createdAt: new Date(data.created_at),
  }
}

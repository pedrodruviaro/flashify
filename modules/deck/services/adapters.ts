import type { Deck } from "~/modules/deck/entities/Deck/Deck"
import type { ReadAllRow } from "./types"

export function readAllAdapter(data: ReadAllRow[] | null): Deck[] | null {
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

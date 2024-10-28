import type { Database } from "~/supabase/schema"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

export type ReadOneRow = Database["public"]["Tables"]["decks"]["Row"]

export type CreateOptions = Omit<Deck, "id" | "createdAt">

export interface GetDeckByIdOptions {
  id: string
  userId: string
}

export type UpdateOptions = Partial<Deck>

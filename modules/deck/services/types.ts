import type { Database } from "~/supabase/schema"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

export type ReadAllRow = Database["public"]["Tables"]["decks"]["Row"]

export type CreateOptions = Omit<Deck, "id" | "createdAt">

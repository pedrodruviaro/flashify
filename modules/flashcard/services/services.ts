import { v4 as uuidv4 } from "uuid"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type { CreateOptions } from "./types"
import { createAdpater } from "./adapters"

export default (client: SupabaseClient<Database>) => ({
  async create({ question, answer, deckId }: CreateOptions) {
    const id = uuidv4()

    const response = await client
      .from("flashcards")
      .insert({ id, question, answer, deck_id: deckId })
      .select()
      .single()

    return createAdpater(response.data)
  },

  async edit() {},

  async remove() {},

  async readAll(deckId: string) {},
})

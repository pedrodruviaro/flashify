import { v4 as uuidv4 } from "uuid"
import { createAdpater, readOneAdapter } from "./adapters"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type { CreateOptions, UpdateOptions } from "./types"

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

  async edit(id: string, { question, answer }: UpdateOptions) {
    const response = await client
      .from("flashcards")
      .update({ question, answer })
      .eq("id", id)
      .select()
      .single()

    return readOneAdapter(response.data)
  },

  async remove(id: string) {
    await client.from("flashcards").delete().eq("id", id)
    return { id }
  },
})

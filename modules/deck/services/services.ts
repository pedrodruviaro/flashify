import { v4 as uuidv4 } from "uuid"
import { readAllAdapter, readFullDeckAdapter } from "./adapters"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type {
  CreateOptions,
  GetFullDeckOptions,
  ReadOneRow,
  UpdateOptions,
} from "./types"

export default (client: SupabaseClient<Database>) => ({
  async getDecksByUserId(userId: string) {
    const response = await client
      .from("decks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .returns<ReadOneRow[]>()

    return readAllAdapter(response.data)
  },

  async create({ title, description, userId }: CreateOptions) {
    const id = uuidv4()

    await client
      .from("decks")
      .insert({ id, title, description, user_id: userId })

    return { id }
  },

  async getFullDeck({ id, userId }: GetFullDeckOptions) {
    const response = await client
      .from("decks")
      .select("*, flashcards(*)")
      .match({ id, user_id: userId })
      .order("created_at", { referencedTable: "flashcards", ascending: false })
      .single()

    return readFullDeckAdapter(response.data)
  },

  async update(id: string, { title, description }: UpdateOptions) {
    await client
      .from("decks")
      .update({
        title,
        description,
      })
      .eq("id", id)

    return { id }
  },

  async remove(id: string) {
    await client.from("flashcards").delete().eq("deck_id", id)
    await client.from("decks").delete().eq("id", id)

    return { id }
  },
})

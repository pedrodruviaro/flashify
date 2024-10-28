import { v4 as uuidv4 } from "uuid"
import { getDeckByIdAdapter, readAllAdapter } from "./adapters"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type {
  CreateOptions,
  GetDeckByIdOptions,
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

  async getDeckById({ id, userId }: GetDeckByIdOptions) {
    const response = await client
      .from("decks")
      .select("*")
      .match({ id: id, user_id: userId })
      .returns<ReadOneRow>()
      .single()

    return getDeckByIdAdapter(response.data)
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
})

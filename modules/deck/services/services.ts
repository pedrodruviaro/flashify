import { v4 as uuidv4 } from "uuid"
import { readAllAdapter } from "./adapters"
import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type { CreateOptions, ReadAllRow } from "./types"

export default (client: SupabaseClient<Database>) => ({
  async getDecksByUserId(userId: string) {
    const response = await client
      .from("decks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .returns<ReadAllRow[]>()

    return readAllAdapter(response.data)
  },

  async create({ title, description, userId }: CreateOptions) {
    const id = uuidv4()

    await client
      .from("decks")
      .insert({ id, title, description, user_id: userId })

    return { id }
  },
})

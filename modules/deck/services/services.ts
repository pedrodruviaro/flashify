import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type { ReadAllRow } from "./types"
import { readAllAdapter } from "./adapters"

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
})

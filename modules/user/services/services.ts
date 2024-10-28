import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import { getMeAdapter } from "./adapters"
import type { UpdateProfileOptions } from "./types"

export default (client: SupabaseClient<Database>) => ({
  async getMe(id: string) {
    const response = await client
      .from("profiles")
      .select("*")
      .eq("id", id)
      .limit(1)
      .single()

    return getMeAdapter(response.data)
  },

  async updateProfile(
    id: string,
    { jobtitle, site, bio }: UpdateProfileOptions
  ) {
    const response = await client
      .from("profiles")
      .update({ jobtitle, site, bio })
      .eq("id", id)

    return response
  },
})

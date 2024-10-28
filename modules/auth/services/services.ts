import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "~/supabase/schema"
import type { ServiceOptions } from "./types"

export default (
  client: SupabaseClient<Database>,
  { redirectUrl }: ServiceOptions
) => ({
  async loginWithGoogle() {
    await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    })
  },

  async logout() {
    await client.auth.signOut()
  },
})

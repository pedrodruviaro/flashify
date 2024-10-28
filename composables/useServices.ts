import AuthServices from "~/modules/auth/services/services"
import UserServices from "~/modules/user/services/services"
import DeckServices from "~/modules/deck/services/services"
import type { Database } from "~/supabase/schema"

export function useServices() {
  const supabase = useSupabaseClient<Database>()
  const appConfig = useRuntimeConfig()
  const redirectUrl = `${appConfig.public.siteUrl}/login/redirect`

  return {
    auth: AuthServices(supabase, { redirectUrl }),
    user: UserServices(supabase),
    deck: DeckServices(supabase),
  }
}

import AuthService from "~/modules/auth/services/services"
import UserService from "~/modules/user/services/services"
import type { Database } from "~/supabase/schema"

export function useServices() {
  const supabase = useSupabaseClient<Database>()
  const appConfig = useRuntimeConfig()
  const redirectUrl = `${appConfig.public.siteUrl}/login/redirect`

  return {
    auth: AuthService(supabase, { redirectUrl }),
    user: UserService(supabase),
  }
}

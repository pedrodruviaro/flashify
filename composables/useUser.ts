import { getMeKey } from "~/modules/user/composables/useGetMe"
import type { UserContextProvider } from "~/modules/user/composables/useGetMe"

export function useUser() {
  const { user, loading } = inject(getMeKey) as UserContextProvider

  return {
    user,
    loading,
  }
}

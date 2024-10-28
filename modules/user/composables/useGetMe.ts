import type { InjectionKey } from "vue"
import type { User } from "~/modules/user/entities/User/User"

export interface UserContextProvider {
  user: Ref<User | undefined>
  loading: Ref<boolean>
}

export const getMeKey = Symbol("user") as InjectionKey<UserContextProvider>

export function useGetMe() {
  const services = useServices()
  const supabaseUser = useSupabaseUser()
  const { logger } = useLogger()

  const loading = ref(true)
  const user = ref<User>()

  provide<UserContextProvider>(getMeKey, { user, loading })

  const getMe = async () => {
    if (!supabaseUser.value) return

    try {
      loading.value = true

      const response = await services.user.getMe(supabaseUser.value.id)

      if (!response) return

      user.value = response
    } catch (error) {
      logger(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => getMe())

  return {
    loading,
    user,
    getMe,
  }
}

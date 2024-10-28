import type { User } from "~/modules/user/entities/User/User"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

export interface UseDecksListOptions {
  user: Ref<User | undefined>
}

export function useDecksList({ user }: UseDecksListOptions) {
  const services = useServices()
  const { logger } = useLogger()

  const userId = ref()
  const loading = ref(true)
  const decks = ref<Deck[]>()

  const getDecks = async () => {
    if (!userId.value) return

    try {
      loading.value = true

      const response = await services.deck.getDecksByUserId(userId.value)

      if (!response) return

      decks.value = response
    } catch (error) {
      logger(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => getDecks())

  watchEffect(() => {
    if (!user.value) return
    userId.value = user.value.id
  })

  return {
    loading,
    decks,
  }
}

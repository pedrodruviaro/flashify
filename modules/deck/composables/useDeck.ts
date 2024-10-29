import type { User } from "~/modules/user/entities/User/User"
import type { DeckVirtual } from "~/modules/deck/entities/Deck/Deck"

export interface UseDeckOptions {
  user: Ref<User | undefined>
  id: string
}

export function useDeck({ user, id }: UseDeckOptions) {
  const services = useServices()
  const router = useRouter()
  const { logger } = useLogger()

  const loading = ref(false)
  const userId = ref()
  const deck = ref<DeckVirtual>()

  const getDeck = async () => {
    try {
      loading.value = true

      const response = await services.deck.getFullDeck({
        id,
        userId: userId.value,
      })

      if (!response) {
        router.push("/dashboard")
        return
      }

      deck.value = response
    } catch (error) {
      logger(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) return
    userId.value = user.value.id
  })

  return {
    loading,
    deck,
    getDeck,
  }
}

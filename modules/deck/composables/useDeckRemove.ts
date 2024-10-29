import type { DeckVirtual } from "~/modules/deck/entities/Deck/Deck"

interface UseDckRemoveOptions {
  deck: Ref<DeckVirtual | undefined>
}

export function useDeckRemove({ deck }: UseDckRemoveOptions) {
  const services = useServices()
  const router = useRouter()
  const toast = useToast()
  const { logger } = useLogger()

  const loading = ref(false)
  const deckId = ref()

  const remove = async () => {
    try {
      loading.value = true

      const response = await services.deck.remove(deckId.value)

      if (!response) return

      toast.add({
        title: "Sucesso!",
        description: "Deck apagado",
        timeout: 2000,
        color: "green",
      })

      router.push("/dashboard")

      return response.id
    } catch (error) {
      logger(error)
      toast.add({
        title: "Algo falhou",
        description: "Tente apagar novamente",
        timeout: 2000,
        color: "red",
      })
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!deck.value) return
    deckId.value = deck.value.id
  })

  return {
    loading,
    remove,
  }
}

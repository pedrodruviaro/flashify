import type { Deck } from "~/modules/deck/entities/Deck/Deck"

interface UseFlashcardCreateOptions {
  deck: Ref<Deck | undefined>
}

interface CreateOptions {
  question: string
  answer: string
}

export function useFlashcardCreate({ deck }: UseFlashcardCreateOptions) {
  const services = useServices()
  const toast = useToast()
  const { logger } = useLogger()

  const loading = ref(false)
  const deckId = ref()

  const create = async ({ question, answer }: CreateOptions) => {
    try {
      loading.value = true

      const flashcard = await services.flashcard.create({
        deckId: deckId.value,
        question,
        answer,
      })

      if (!flashcard) return

      toast.add({
        title: "Sucesso!",
        description: "Flashcard criado",
        timeout: 2000,
        color: "green",
      })

      return flashcard
    } catch (error) {
      logger(error)
      toast.add({
        title: "Algo falhou",
        description: "Tente criar novamente",
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
    create,
  }
}

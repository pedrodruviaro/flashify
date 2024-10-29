interface EditOptions {
  question: string
  answer: string
}

export function useFlashcardEdit() {
  const services = useServices()
  const toast = useToast()
  const { logger } = useLogger()

  const loading = ref(false)

  const edit = async (id: string, { question, answer }: EditOptions) => {
    try {
      loading.value = true

      const response = await services.flashcard.edit(id, { question, answer })

      if (!response) return

      toast.add({
        title: "Sucesso!",
        description: "Flashcard atualizado",
        timeout: 2000,
        color: "green",
      })

      return response
    } catch (error) {
      logger(error)
      toast.add({
        title: "Algo falhou",
        description: "Tente salvar novamente",
        timeout: 2000,
        color: "red",
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    edit,
  }
}

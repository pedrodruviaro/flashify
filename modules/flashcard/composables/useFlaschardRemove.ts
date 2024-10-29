export function useFlashcardRemove() {
  const services = useServices()
  const toast = useToast()
  const { logger } = useLogger()

  const loading = ref(false)

  const remove = async (id: string) => {
    try {
      loading.value = true

      const response = await services.flashcard.remove(id)

      if (!response.id) return

      toast.add({
        title: "Sucesso!",
        description: "Flashcard apagado",
        timeout: 2000,
        color: "green",
      })

      return
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

  return {
    loading,
    remove,
  }
}

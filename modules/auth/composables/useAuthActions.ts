export function useAuthActions() {
  const toast = useToast()
  const services = useServices()
  const { logger } = useLogger()

  const loading = ref(false)

  const login = async () => {
    try {
      loading.value = true
      await services.auth.loginWithGoogle()
    } catch (error) {
      toast.add({
        title: "Algo deu errado",
        description: "Tente novamente",
        color: "red",
        timeout: 2000,
      })

      logger(error)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      loading.value = true
      await services.auth.logout()
    } catch (error) {
      toast.add({
        title: "Algo deu errado",
        description: "Tente novamente",
        color: "red",
        timeout: 2000,
      })

      logger(error)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    login,
    logout,
  }
}

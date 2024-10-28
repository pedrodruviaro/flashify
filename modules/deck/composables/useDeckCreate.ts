import { z } from "zod"
import type { User } from "~/modules/user/entities/User/User"
import type { ZodFormattedError } from "zod"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

export interface UseDeckCreateOptions {
  user: Ref<User | undefined>
}

const schema = z.object({
  title: z.string().min(2, "Um título é obrigatório"),
  description: z.string().min(2, "Uma descrição é obrigatória"),
})

export function useDeckCreate({ user }: UseDeckCreateOptions) {
  const services = useServices()
  const toast = useToast()
  const { logger } = useLogger()

  const userId = ref()
  const loading = ref(false)

  const title = ref("")
  const description = ref("")

  const errors = ref<ZodFormattedError<Deck>>()

  const safeParse = () => {
    const result = schema.safeParse({
      title: title.value,
      description: description.value,
    })

    if (!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const create = async () => {
    if (!userId.value) return

    const isValid = safeParse().success
    if (!isValid) return

    try {
      loading.value = true

      const response = await services.deck.create({
        title: title.value,
        description: description.value,
        userId: userId.value,
      })

      toast.add({
        title: "Sucesso!",
        description: "Seu deck foi criado",
        color: "green",
        timeout: 2000,
      })

      return { id: response.id }
    } catch (error) {
      logger(error)
      toast.add({
        title: "Algo falhou",
        description: "Tente criar novamente",
        color: "red",
        timeout: 2000,
      })
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
    errors,
    title,
    description,
    safeParse,
    create,
  }
}

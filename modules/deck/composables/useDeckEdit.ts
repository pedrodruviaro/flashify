import { z } from "zod"
import type { ZodFormattedError } from "zod"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

export interface UseDeckEditOptions {
  deck: Ref<Deck | undefined>
}

const schema = z.object({
  title: z.string().min(2, "Um título é obrigatório"),
  description: z.string().min(2, "Uma descrição é obrigatória"),
})

export function useDeckEdit({ deck }: UseDeckEditOptions) {
  const services = useServices()
  const toast = useToast()
  const { logger } = useLogger()

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

  const edit = async () => {
    const isValid = safeParse().success
    if (!isValid) return

    if (!deck.value) return

    try {
      loading.value = true

      await services.deck.update(deck.value.id, {
        title: title.value,
        description: description.value,
      })

      toast.add({
        title: "Sucesso!",
        description: "Deck atualizado",
        timeout: 2000,
        color: "green",
      })
    } catch (error) {
      logger(error)
      toast.add({
        title: "Algo falhou",
        description: "Tente novamente",
        timeout: 2000,
        color: "red",
      })
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!deck.value) return

    title.value = deck.value.title
    description.value = deck.value.description
  })

  return {
    title,
    description,
    loading,
    errors,
    edit,
  }
}

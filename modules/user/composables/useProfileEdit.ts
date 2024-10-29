import { z } from "zod"
import type { ZodFormattedError } from "zod"
import type { User } from "~/modules/user/entities/User/User"

export interface UseProfileEditOptions {
  user: Ref<User | undefined>
}

const schema = z.object({
  jobtitle: z.string().max(200, "O campo não pode ter mais que 200 caracteres"),
  site: z.string().max(200, "O campo não pode ter mais que 200 caracteres"),
  bio: z.string().max(200, "O campo não pode ter mais que 500 caracteres"),
})

export function useProfileEdit({ user }: UseProfileEditOptions) {
  const services = useServices()
  const toast = useToast()
  const { logger } = useLogger()

  const loading = ref(false)

  const userId = ref("")

  const jobtitle = ref("")
  const site = ref("")
  const bio = ref("")

  const errors = ref<ZodFormattedError<User>>()

  const safeParse = () => {
    const result = schema.safeParse({
      jobtitle: jobtitle.value,
      site: site.value,
      bio: bio.value,
    })

    if (!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const update = async () => {
    const isValid = safeParse().success
    if (!isValid) return

    try {
      loading.value = true

      await services.user.updateProfile(userId.value, {
        jobtitle: jobtitle.value,
        bio: bio.value,
        site: site.value,
      })

      toast.add({
        title: "Sucesso!",
        description: "Perfil atualizado",
        timeout: 2000,
        color: "green",
      })

      errors.value = undefined

      // Update global user state
      if (user.value) {
        user.value.jobtitle = jobtitle.value
        user.value.bio = bio.value
        user.value.site = site.value
      }
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
    if (!user.value) return

    userId.value = user.value.id

    jobtitle.value = user.value.jobtitle ?? ""
    site.value = user.value.site ?? ""
    bio.value = user.value.bio ?? ""
  })

  return {
    jobtitle,
    site,
    bio,
    loading,
    errors,
    update,
  }
}

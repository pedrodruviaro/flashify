export function useLogger() {
  const appConfig = useRuntimeConfig()
  const isProductionEnv = appConfig.public.nodeEnv === "production"

  const logger = (...args: any[]) => {
    if (isProductionEnv) return

    console.log(...args)
  }

  return {
    logger,
  }
}

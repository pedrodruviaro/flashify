<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push("/dashboard")
  }, 1000)
})
</script>

<template>
  <div class="grid place-items-center py-20 lg:mt-36">
    <Logo class="mb-3" />
    <BaseTitle
      center
      size="lg"
      light
      label="Redirecionando..."
      class="animate-pulse"
    />
  </div>
</template>

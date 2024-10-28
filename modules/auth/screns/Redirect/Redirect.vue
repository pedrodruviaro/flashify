<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push("/dashboard")
  }, 1000)
})
</script>

<template>
  <div>Redirecionando...</div>
</template>

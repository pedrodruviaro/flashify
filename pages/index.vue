<script setup lang="ts">
const toast = useToast()
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <div>Landing Page</div>
    <UButton @click="toast.add({ title: 'Hello NuxtUI' })" label="Hello vue" />
    <UButton variant="outline" to="/login">Login</UButton>
  </div>
</template>

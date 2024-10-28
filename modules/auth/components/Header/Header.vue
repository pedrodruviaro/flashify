<script setup lang="ts">
const emits = defineEmits<{
  (e: "open-sidebar"): void
}>()
</script>

<template>
  <header class="py-2.5 shadow-sm">
    <UContainer class="flex items-center gap-2 justify-between">
      <NuxtLink to="/dashboard">
        <Logo />
      </NuxtLink>

      <UButton
        icon="i-heroicons-arrow-left-solid"
        size="sm"
        color="primary"
        square
        variant="outline"
        @click="emits('open-sidebar')"
      />
    </UContainer>
  </header>
</template>

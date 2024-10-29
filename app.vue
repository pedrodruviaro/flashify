<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "pt-BR",
  },
  titleTemplate: (chunk) => {
    return chunk ? `${chunk} | Flashify` : "Flashify"
  },
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UModals />
    <UNotifications />
  </div>
</template>

<style>
body,
html,
#__nuxt {
  @apply min-h-screen bg-stone-50;
}
</style>

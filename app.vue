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

.page-enter-active,
.page-leave-active {
  transition: all 0.35s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>

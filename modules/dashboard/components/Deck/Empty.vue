<script setup lang="ts">
const emits = defineEmits<{
  (e: "new-deck"): void
}>()
</script>

<template>
  <div class="py-6 flex flex-col gap-4 items-center justify-center text-center">
    <p class="font-semibold text-xl md:text-2xl">Você não tem decks criados</p>
    <UButton label="Comece agora" @click="emits('new-deck')" />
  </div>
</template>

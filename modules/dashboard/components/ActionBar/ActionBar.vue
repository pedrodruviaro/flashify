<script setup lang="ts">
const emits = defineEmits<{
  (e: "new-deck"): void
}>()

const search = defineModel<string>("search")
</script>

<template>
  <section>
    <div class="grid gap-4 px-6 py-4 bg-yellow-400 rounded-lg">
      <BaseTitle label="Meus decks" class="flex-1" />

      <div class="flex items-center flex-wrap justify-between gap-2">
        <UButton
          color="white"
          variant="solid"
          icon="i-heroicons-plus"
          label="Novo Deck"
          @click="emits('new-deck')"
        />

        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="white"
          placeholder="Busque por um título..."
          class="flex-0"
          type="search"
          :trailing="false"
          v-model="search"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "correct"): void
  (e: "incorret"): void
  (e: "close"): void
}>()
</script>

<template>
  <UModal>
    <UCard>
      <template #header>
        <div class="flex justify-between flex-wrap gap-2">
          <BaseTitle size="sm" light label="Como funciona" />
          <UButton
            color="gray"
            variant="ghost"
            square
            icon="i-heroicons-x-mark-20-solid"
            @click="emits('close')"
            tabindex="0"
          />
        </div>
      </template>

      <div class="space-y-2">
        <p>
          Flashcards são cartões que servem para testar sua memória. De um lado,
          eles tem a pergunta, e do outro, a respostaa. É possível variar
          também, com tópicos e palavras-chave ou termos e definições.
        </p>
        <p>
          Clique nos cards e veja se a resposta bate com a sua. Marque o
          resultado, conte os acertos e veja seu desempenho.
        </p>
        <p>
          Você pode ver as perguntas respondidas no menu central. Em verde ficam
          as respostas certas e em vermelho, as erradas.
        </p>
      </div>
    </UCard>
  </UModal>
</template>

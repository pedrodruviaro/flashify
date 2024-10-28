<script setup lang="ts">
const emits = defineEmits<{
  (e: "save"): void
}>()

const title = defineModel<string>("title")
const description = defineModel<string>("description")
</script>

<template>
  <section>
    <BaseTitle
      as="h1"
      size="sm"
      label="Informações sobre o deck"
      class="mb-2"
    />
    <form class="space-y-2">
      <UFormGroup label="Título" required>
        <UInput placeholder="Questões sobre programação" v-model="title" />
      </UFormGroup>

      <UFormGroup label="Descrição" required>
        <UTextarea
          :rows="3"
          placeholder="Uma descrição sobre o assunto"
          v-model="description"
        />
      </UFormGroup>

      <UButton
        label="Salvar informações"
        variant="outline"
        icon="i-heroicons-pencil-square"
        trailing
        @click="emits('save')"
      />
    </form>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  question: string
  answer: string
}>()

const emits = defineEmits<{
  (e: "edit", id: string): void
  (e: "remove", id: string): void
}>()

const isAnswerOpen = ref(true)
</script>

<template>
  <UCard>
    <template #header>
      <p class="font-semibold">{{ props.question }}</p>

      <UBadge size="md" color="white" variant="solid" class="mt-3">
        <div class="flex items-center gap-2">
          <span>Exibir resposta</span>
          <UToggle
            on-icon="i-heroicons-eye-solid"
            off-icon="i-heroicons-eye-slash"
            v-model="isAnswerOpen"
          />
        </div>
      </UBadge>
    </template>

    <template #default>
      <div>
        <p
          class="text-sm md:text-base text-stone-500 dark:text-stone-300"
          :class="{ 'blur-sm': !isAnswerOpen }"
        >
          {{ props.answer }}
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 flex-wrap">
        <UButton
          label="Editar"
          icon="i-heroicons-pencil-square"
          trailing
          variant="outline"
          @click="emits('edit', props.id)"
        />
        <UButton
          label="Apagar "
          icon="i-heroicons-trash"
          color="red"
          trailing
          variant="outline"
          @click="emits('remove', props.id)"
        />
      </div>
    </template>
  </UCard>
</template>

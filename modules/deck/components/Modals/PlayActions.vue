<script setup lang="ts">
const props = defineProps<{
  question: string
  answer: string
}>()

const emits = defineEmits<{
  (e: "correct"): void
  (e: "incorret"): void
  (e: "close"): void
}>()
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <template #header>
        <div class="flex justify-end">
          <UButton
            color="gray"
            variant="ghost"
            square
            icon="i-heroicons-x-mark-20-solid"
            @click="emits('close')"
          />
        </div>
        <BaseTitle size="xs" light :label="props.question" />
      </template>
      <template #default>
        <p class="text-lg text-stone-700">{{ props.answer }}</p>
      </template>

      <template #footer>
        <div class="flex items-center gap-4 flex-wrap">
          <UButton
            color="red"
            label="Errei"
            variant="outline"
            icon="i-heroicons-x-mark-20-solid"
            tabindex="0"
            @click="emits('incorret')"
          />
          <UButton
            color="green"
            label="Acertei"
            icon="i-heroicons-check-16-solid"
            tabindex="0"
            @click="emits('correct')"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

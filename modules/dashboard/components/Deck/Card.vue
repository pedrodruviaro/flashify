<script setup lang="ts">
import { dateFormate } from "~/helpers/dateFormat"

const props = defineProps<{
  id: string
  title: string
  createdAt: Date
  description: string
}>()

const emits = defineEmits<{
  (e: "edit", id: string): void
  (e: "play", id: string): void
}>()

const formatedDate = computed(() => dateFormate(props.createdAt))
</script>

<template>
  <UCard
    :ui="{
      ring: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
    }"
    class="grid grid-rows-[max-content_1fr_max-content]"
  >
    <template #header>
      <div>
        <UBadge color="white" variant="solid">
          Criado em {{ formatedDate }}
        </UBadge>
        <BaseTitle as="h3" size="xs" light :label="props.title" class="mt-2" />
      </div>
    </template>

    <div>
      <p class="text-stone-500 text-sm">{{ props.description }}</p>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UButton
          color="primary"
          variant="soft"
          label="Editar"
          trailing
          @click="emits('edit', props.id)"
        />
        <UButton
          color="primary"
          variant="solid"
          @click="emits('play', props.id)"
          >Jogar</UButton
        >
      </div>
    </template>
  </UCard>
</template>

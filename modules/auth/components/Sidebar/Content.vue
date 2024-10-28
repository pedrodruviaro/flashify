<script setup lang="ts">
const emits = defineEmits<{
  (e: "close-sidebar"): void
}>()
</script>

<template>
  <UCard class="flex flex-col flex-1">
    <template #header>
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        square
        padded
        @click="emits('close-sidebar')"
      />
      header
    </template>

    content

    <template #footer>footer</template>
  </UCard>
</template>

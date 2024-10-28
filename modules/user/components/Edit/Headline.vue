<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  name: string
}>()
</script>

<template>
  <div class="flex items-center flex-wrap gap-4">
    <UAvatar size="xl" :src="props.avatarUrl" alt="Avatar" />
    <UBadge color="white" variant="solid" size="lg">
      {{ props.name }}
    </UBadge>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  name: string
}>()
</script>

<template>
  <div class="flex flex-col justify-start gap-1 items-start">
    <UAvatar size="3xl" :src="props.avatarUrl" alt="Avatar" />
    <UBadge color="white" variant="solid" size="lg">
      {{ props.name }}
    </UBadge>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
}>()

const emits = defineEmits<{
  (e: "navigate-to-dashboard"): void
  (e: "navigate-to-profile-edit"): void
  (e: "close-sidebar"): void
  (e: "logout"): void
}>()
</script>

<template>
  <UCard class="grid h-full grid-rows-[max-content_1fr_max-content]">
    <template #header>
      <div class="flex items-center justify-between">
        <UAvatar size="md" :src="props.avatarUrl" />

        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          square
          padded
          @click="emits('close-sidebar')"
        />
      </div>
    </template>

    <div class="grid gap-2">
      <BaseTitle size="xs" label="Menu" light class="mb-1" />
      <UButton
        color="white"
        label="Dashboard"
        icon="i-heroicons-home"
        @click="emits('navigate-to-dashboard')"
      />

      <UButton
        color="white"
        label="Editar Perfil"
        icon="i-heroicons-user"
        @click="emits('navigate-to-profile-edit')"
      />
    </div>

    <template #footer>
      <UButton
        color="white"
        label="Sair"
        icon="i-heroicons-arrow-left-start-on-rectangle-solid"
        block
        @click="emits('logout')"
      />
    </template>
  </UCard>
</template>

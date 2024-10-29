<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
}>()

const emits = defineEmits<{
  (e: "close-sidebar"): void
  (e: "logout"): void
}>()

const links = [
  {
    label: "Dashboard",
    icon: "i-heroicons-home",
    to: "/dashboard",
  },
  {
    label: "Editar perfil",
    icon: "i-heroicons-user",
    to: "/dashboard/profile/edit",
  },
]
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

    <UVerticalNavigation :links="links">
      <template #default="{ link }">
        <span
          @click="emits('close-sidebar')"
          class="group-hover:text-primary relative"
          >{{ link.label }}</span
        >
      </template>
    </UVerticalNavigation>

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

<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  username: string
  jobtitle?: string
}>()

const emits = defineEmits<{
  (e: "edit-profile"): void
}>()

const items = [
  [
    {
      label: "Editar perfil",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => emits("edit-profile"),
    },
  ],
]
</script>

<template>
  <section
    class="grid gap-2 md:grid-cols-[max-content_1fr] md:items-center md:gap-6"
  >
    <UAvatar size="2xl" :src="props.avatarUrl" alt="Avatar" />

    <div>
      <div class="flex items-center gap-2">
        <BaseTitle :label="props.username" />
        <UDropdown :items="items">
          <UButton
            variant="ghost"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />
        </UDropdown>
      </div>
      <p class="text-xs font-regular text-stone-500 mb-2" v-if="props.jobtitle">
        {{ props.jobtitle }}
      </p>
      <p class="text-sm font-semibold text-stone-500">Dashboard</p>
    </div>
  </section>
</template>

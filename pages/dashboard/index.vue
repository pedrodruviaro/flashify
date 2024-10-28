<script setup lang="ts">
definePageMeta({
  layout: "admin",
})

useSeoMeta({
  title: "Dashboard",
})

const decks = ref([
  {
    id: 1,
    title: "Typescript",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
    cards: 24,
    createdAt: "10/10/10",
  },

  {
    id: 2,
    title: "TailwindCSS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
    cards: 20,
    createdAt: "20/10/10",
  },

  {
    id: 3,
    title: "TailwindCSS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
    cards: 20,
    createdAt: "20/10/10",
  },
])

const router = useRouter()
const items = [
  [
    {
      label: "Editar perfil",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => router.push("/dashboard/profile/edit"),
    },
  ],
]
</script>

<template>
  <div class="space-y-8 lg:space-y-10">
    <section
      class="grid gap-2 md:grid-cols-[max-content_1fr] md:items-center md:gap-6"
    >
      <div>
        <UAvatar
          size="2xl"
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="Avatar"
        />
      </div>

      <div>
        <div class="flex items-center gap-2">
          <BaseTitle label="John Doe" />
          <UDropdown :items="items">
            <UButton
              variant="ghost"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />
          </UDropdown>
        </div>
        <p
          class="text-sm font-semibold text-stone-500 dark:text-stone-300 uppercase"
        >
          Dashboard
        </p>
      </div>
    </section>

    <section>
      <div
        class="grid md:flex items-center gap-2 px-6 py-4 bg-yellow-400 rounded-lg"
      >
        <BaseTitle label="Meus decks" class="flex-1" />
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="gray"
          :trailing="false"
          placeholder="Busque por um deck..."
          class="flex-0"
        />
      </div>
    </section>

    <section>
      <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
          v-for="deck in decks"
          :key="deck.id"
        >
          <template #header>
            <div class="flex flex-wrap justify-between gap-2 items-center">
              <BaseTitle as="h3" size="xs" light :label="deck.title" />
              <UBadge color="white" variant="solid">
                Criado em {{ deck.createdAt }}
              </UBadge>
            </div>
          </template>

          <div>
            <p class="text-stone-500 text-sm">{{ deck.description }}</p>
          </div>

          <template #footer>
            <div class="flex flex-wrap gap-2">
              <UButton color="primary" variant="soft" label="Editar" trailing />

              <UButton color="primary" variant="solid">Jogar</UButton>
            </div>
          </template>
        </UCard>
      </ul>
    </section>
  </div>
</template>

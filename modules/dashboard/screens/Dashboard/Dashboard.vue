<script setup lang="ts">
import HeadlineLoader from "~/modules/dashboard/components/Headline/Loader.vue"
import Headline from "~/modules/dashboard/components/Headline/Headline.vue"
import ActionBarLoader from "~/modules/dashboard/components/ActionBar/Loader.vue"
import ActionBar from "~/modules/dashboard/components/ActionBar/ActionBar.vue"
import DeckListLoader from "~/modules/dashboard/components/Deck/Loader.vue"
import DeckListEmpty from "~/modules/dashboard/components/Deck/Empty.vue"
import DeckList from "~/modules/dashboard/components/Deck/List.vue"
import DeckCard from "~/modules/dashboard/components/Deck/Card.vue"
import LazyNewDeck from "~/modules/dashboard/components/Modals/NewDeck.vue"
import { useDecksList } from "~/modules/deck/composables/useDecksList"
import { useDeckCreate } from "~/modules/deck/composables/useDeckCreate"
import type { Deck } from "~/modules/deck/entities/Deck/Deck"

const router = useRouter()

const search = ref("")

const { user, loading: loadingUser } = useUser()

const {
  title,
  description,
  errors,
  loading: loadingCreate,
  create,
} = useDeckCreate({ user })

const { loading: loadingDecks, decks } = useDecksList({ user }) // filtro?

const filteredDecks = computed(() => {
  return search.value !== ""
    ? decks.value?.filter((d) => d.title.toLowerCase().includes(search.value))
    : decks.value
})

const isModalCreateOpen = ref(false)

const handleNewDeck = async () => {
  const response = await create()
  if (response) {
    isModalCreateOpen.value = false
    router.push(`/dashboard/decks/${response.id}`)
  }
}
</script>

<template>
  <div class="space-y-8 lg:space-y-10">
    <HeadlineLoader :loading="loadingUser">
      <Headline
        v-if="user"
        :avatarUrl="user.avatarUrl"
        :username="user.name"
        :jobtitle="user.jobtitle"
        @edit-profile="router.push('/dashboard/profile/edit')"
      />
    </HeadlineLoader>

    <ActionBarLoader :loading="false">
      <ActionBar v-model:search="search" @new-deck="isModalCreateOpen = true" />
    </ActionBarLoader>

    <DeckListLoader :loading="loadingDecks">
      <DeckList v-if="decks?.length !== 0" v-auto-animate>
        <DeckCard
          v-for="deck in filteredDecks"
          :key="deck.id"
          :id="deck.id"
          :title="deck.title"
          :description="deck.description"
          :createdAt="deck.createdAt"
          @edit="router.push(`/dashboard/decks/${deck.id}`)"
          @play="router.push(`/play/${deck.id}`)"
        />
      </DeckList>

      <DeckListEmpty v-else @new-deck="isModalCreateOpen = true" />
      <p class="text-center col-span-2" v-if="filteredDecks?.length === 0">
        Sem resultados para a busca
      </p>
    </DeckListLoader>

    <LazyNewDeck
      v-model:is-open="isModalCreateOpen"
      v-model:title="title"
      v-model:description="description"
      :loading="loadingCreate"
      :errors="errors"
      @create="handleNewDeck"
    />
  </div>
</template>

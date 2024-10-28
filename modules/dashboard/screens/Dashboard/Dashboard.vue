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

const hasDecks = computed(() => decks.value?.length !== 0)

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
        :avatarUrl="user?.avatarUrl"
        :username="user?.name"
        @edit-profile="router.push('/dashboard/profile/edit')"
      />
    </HeadlineLoader>

    <ActionBarLoader :loading="false">
      <ActionBar v-model:search="search" @new-deck="isModalCreateOpen = true" />
    </ActionBarLoader>

    <DeckListLoader :loading="loadingDecks">
      <DeckList v-if="hasDecks">
        <DeckCard
          v-for="deck in decks"
          :key="deck.id"
          :id="deck.id"
          :title="deck.title"
          :description="deck.description"
          :createdAt="deck.createdAt"
          @edit="router.push(`/dashboard/decks/${deck.id}`)"
          @play="router.push(`/dashboard/decks/${deck.id}`)"
        />
      </DeckList>

      <DeckListEmpty v-else @new-deck="isModalCreateOpen = true" />
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

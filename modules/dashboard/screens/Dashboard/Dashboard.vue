<script setup lang="ts">
import HeadlineLoader from "~/modules/dashboard/components/Headline/Loader.vue"
import Headline from "~/modules/dashboard/components/Headline/Headline.vue"
import ActionBarLoader from "~/modules/dashboard/components/ActionBar/Loader.vue"
import ActionBar from "~/modules/dashboard/components/ActionBar/ActionBar.vue"
import DeckListLoader from "~/modules/dashboard/components/Deck/Loader.vue"
import DeckListEmpty from "~/modules/dashboard/components/Deck/Empty.vue"
import DeckList from "~/modules/dashboard/components/Deck/List.vue"
import DeckCard from "~/modules/dashboard/components/Deck/Card.vue"
import LazyModalNewDeckForm from "~/modules/dashboard/components/Modals/NewDeckForm.vue"
import { useDecksList } from "~/modules/deck/composables/useDecksList"

const router = useRouter()

const search = ref("")

const { user, loading: loadingUser } = useUser()
// const { title, description, loading: loadingCreate, create } = useDeckCreate()
const { loading: loadingDecks, decks } = useDecksList({ user }) // filtro?

const hasDecks = computed(() => decks.value?.length !== 0)

const title = ref("")
const description = ref("")

const modal = useModal()

const handleNewDeck = () => {
  modal.open(LazyModalNewDeckForm, {
    title: title.value,
    description: description.value,
    "onUpdate:title": (val: string) => (title.value = val),
    "onUpdate:description": (val: string) => (description.value = val),
    onSuccess: () => {
      // CREATE AND REDIRECT LOGIC
    },
    onClose: () => {
      modal.close()
      title.value = ""
      description.value = ""
    },
  })
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
      <ActionBar v-model:search="search" @new-deck="handleNewDeck" />
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

      <DeckListEmpty v-else @new-deck="handleNewDeck" />
    </DeckListLoader>
  </div>
</template>

<script setup lang="ts">
import HeadlineLoader from "~/modules/dashboard/components/Headline/Loader.vue"
import Headline from "~/modules/dashboard/components/Headline/Headline.vue"
import ActionBarLoader from "~/modules/dashboard/components/ActionBar/Loader.vue"
import ActionBar from "~/modules/dashboard/components/ActionBar/ActionBar.vue"
import DeckListLoader from "~/modules/dashboard/components/Deck/Loader.vue"
import DeckList from "~/modules/dashboard/components/Deck/List.vue"
import DeckCard from "~/modules/dashboard/components/Deck/Card.vue"
import LazyModalNewDeckForm from "~/modules/dashboard/components/Modals/NewDeckForm.vue"

const decks = ref([
  {
    id: "1",
    title: "Typescript",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
    cards: 24,
    createdAt: "10/10/10",
  },

  {
    id: "2",
    title: "TailwindCSS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
    cards: 20,
    createdAt: "20/10/10",
  },

  {
    id: "3",
    title: "TailwindCSS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sed urna at lacinia. Nunc hendrerit consectetur sapien. Curabitur fermentum libero sed ligula faucibus, laoreet porta ligula convallis.",
    cards: 20,
    createdAt: "20/10/10",
  },
])

const router = useRouter()

const search = ref("")

// const { user } = useUser()
// const { title, description, loading: loadingCreate, create } = useDeckCreate()
// const { loading: loadingDecks, decks } = useDeckList() // filtro?

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
    <HeadlineLoader :loading="false">
      <Headline
        avatar-url="https://avatars.githubusercontent.com/u/739984?v=4"
        username="John Doe"
        @edit-profile="router.push('/dashboard/profile/edit')"
      />
    </HeadlineLoader>

    <ActionBarLoader :loading="false">
      <ActionBar v-model:search="search" @new-deck="handleNewDeck" />
    </ActionBarLoader>

    <DeckListLoader :loading="false">
      <DeckList>
        <DeckCard
          v-for="deck in decks"
          :key="deck.id"
          :id="deck.id"
          :title="deck.title"
          :description="deck.description"
          :created-at="deck.createdAt"
          @edit="router.push(`/dashboard/decks/${deck.id}`)"
          @play="router.push(`/dashboard/decks/${deck.id}`)"
        />
      </DeckList>
    </DeckListLoader>
  </div>
</template>

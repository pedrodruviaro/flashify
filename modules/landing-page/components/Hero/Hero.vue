<script setup lang="ts"></script>

<template>
  <section class="grid gap-6 md:grid-cols-2 items-center lg:gap-10">
    <div>
      <BaseTitle
        size="xl"
        class="text-balance"
        label="Estude de forma fácil e divertida"
      />

      <p class="text-lg mt-4 md:text-balance">
        Utilize flashcards, melhore sua memória e aprenda mais rápido. <br />
      </p>
      <p class="mb-8 text-lg md:text-balance">
        Comece já a criar seus decks e inicie os estudos.
      </p>
      <UButton label="Entre e conheça" size="xl" link to="/login" />
    </div>

    <div>
      <img
        src="/public/images/hero-img.png"
        alt="Tela do sistema"
        width="600"
        height="430"
      />
    </div>
  </section>
</template>

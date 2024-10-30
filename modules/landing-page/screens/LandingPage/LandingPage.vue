<script setup lang="ts">
import Header from "~/modules/landing-page/components/Header/Header.vue"
import Hero from "~/modules/landing-page/components/Hero/Hero.vue"
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <div class="relative z-10">
      <Header />
      <Hero class="mt-16 lg:mt-20" />
    </div>

    <div
      class="absolute bottom-0 right-0 z-0 w-[100%] sm:w-[80%] md:w-[50%] 2xl:w-[40%]"
    >
      <img src="/public/images/hero-blog.svg" aria-hidden="true" alt="" />
    </div>
  </div>
</template>

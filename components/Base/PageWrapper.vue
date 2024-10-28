<script setup lang="ts"></script>

<template>
  <div>
    <slot name="header" />

    <main class="mt-10 lg:mt-14">
      <slot />
    </main>
  </div>
</template>

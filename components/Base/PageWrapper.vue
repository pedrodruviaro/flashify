<script setup lang="ts"></script>

<template>
  <div>
    <slot name="header" />

    <main class="my-10 lg:my-14">
      <slot />
    </main>
  </div>
</template>

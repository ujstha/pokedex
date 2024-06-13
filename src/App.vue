<script setup>
import { Suspense } from 'vue'
import PokemonCard from "./components/PokemonCard.vue";
import Loader from './components/Loader.vue'
</script>

<template>
  <h1>Template HelloWorld</h1>
  <Suspense>
    <template #default>
      <PokemonCard />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>

</template>

<style scoped></style>

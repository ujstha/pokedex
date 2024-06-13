<script setup>
import { Suspense } from 'vue'
import Loader from './components/Loader.vue'
import PokemonList from './components/PokemonList.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <PokemonList />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>

</template>

<style scoped></style>

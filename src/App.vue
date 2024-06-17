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
      <div class="flex min-h-36 justify-center items-center">
        <Loader />
      </div>
    </template>
  </Suspense>

</template>

<style scoped></style>

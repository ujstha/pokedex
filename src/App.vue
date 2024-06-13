<script setup>
import Loader from "./components/Loader.vue";
import PokemonCard from "./components/PokemonCard.vue";

import { POKEMON_IMAGE_BASE_URL } from "./constants";

const pokemon = {
  id: 1,
  name: 'Pikachu',
  imageURL: `${POKEMON_IMAGE_BASE_URL}/40.png`,
  types: ['electric', 'fire']
}
</script>

<template>
  <h1>Template HelloWorld</h1>
  <Loader />
  <PokemonCard :pokemon="pokemon" poke-type-color="bg-blue-500" />
</template>

<style scoped></style>

<script setup>
import PokemonCard from "./PokemonCard.vue";

import { fetchAllPokemons } from '../helpers';

const pokemons = await fetchAllPokemons()

</script>

<template>
  <div class="flex justify-center flex-col sm:flex-row flex-wrap gap-4">
    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
  </div>
</template>

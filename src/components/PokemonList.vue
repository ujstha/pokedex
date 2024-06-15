<script setup>
import { ref } from "vue";

import PokemonCard from "./PokemonCard.vue";
import PokemonInfo from "./PokemonInfo.vue";

import { fetchAllPokemons, fetchPokemonById } from '../helpers';

const pokemon = ref({})
const pokemons = await fetchAllPokemons()

const openPokemonInfo = async (id) => {
  pokemon.value = await fetchPokemonById(id)
}
</script>

<template>
  <div class="flex justify-center flex-col sm:flex-row flex-wrap gap-6">
    <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"
      @open-pokemon-info="openPokemonInfo(pokemon.id)" />
  </div>

  <PokemonInfo :pokemon="pokemon" />
</template>

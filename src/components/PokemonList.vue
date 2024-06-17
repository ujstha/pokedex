<script setup>
import { onMounted, ref } from "vue";

import PokemonCard from "./PokemonCard.vue";
import PokemonInfo from "./PokemonInfo.vue";
import PokemonSearch from "./PokemonSearch.vue";

import { fetchAllPokemons, fetchPokemonById } from "../helpers";

const pokemons = ref([]);
const displayInfo = ref(false);
const selectedPokemon = ref(null);

onMounted(async () => {
  try {
    pokemons.value = await fetchAllPokemons();
  } catch (error) {
    alert("Error fetching pokemon", error);
  }
});
const displayPokemonInfo = async (id) => {
  displayInfo.value = true;
  selectedPokemon.value = await fetchPokemonById(id);
};

const hidePokemonInfo = () => {
  displayInfo.value = false;
  selectedPokemon.value = null;
};
</script>

<template>
  <PokemonSearch />
  <div class="flex flex-col flex-wrap justify-center gap-6 sm:flex-row">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @select-pokemon="displayPokemonInfo"
    />
  </div>

  <PokemonInfo
    :show="displayInfo"
    :pokemon="selectedPokemon"
    @close="hidePokemonInfo"
    @select-pokemon="displayPokemonInfo"
  />
</template>

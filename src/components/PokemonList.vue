<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import Loader from "./Loader.vue";
import PokemonCard from "./PokemonCard.vue";
import PokemonInfo from "./PokemonInfo.vue";
import PokemonSearch from "./PokemonSearch.vue";

import { fetchAllPokemons, fetchPokemonById } from "../helpers";

const pokemons = ref([]);
const visiblePokemons = ref([]);
const itemsPerPage = 20;
const loading = ref(false);
const displayInfo = ref(false);
const selectedPokemon = ref(null);

const loadMorePokemons = () => {
  if (loading.value) return;
  loading.value = true;

  setTimeout(() => {
    const nextPokemons = pokemons.value.slice(
      visiblePokemons.value.length,
      visiblePokemons.value.length + itemsPerPage,
    );
    visiblePokemons.value = [...visiblePokemons.value, ...nextPokemons];
    loading.value = false;
  }, 1000);
};

const handleWindowScroll = () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight
  ) {
    loadMorePokemons();
  }
};

const displayPokemonInfo = async (id) => {
  displayInfo.value = true;
  selectedPokemon.value = await fetchPokemonById(id);
};

const hidePokemonInfo = () => {
  displayInfo.value = false;
  selectedPokemon.value = null;
};

onMounted(async () => {
  try {
    pokemons.value = await fetchAllPokemons();
    loadMorePokemons();
    window.addEventListener("scroll", handleWindowScroll);
  } catch (error) {
    alert("Error fetching pokemon", error);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleWindowScroll);
});
</script>

<template>
  <PokemonSearch />

  <div class="flex flex-col flex-wrap justify-center gap-6 sm:flex-row">
    <PokemonCard
      v-for="pokemon in visiblePokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @select-pokemon="displayPokemonInfo"
    />
  </div>
  <div v-if="loading" class="flex justify-center py-6">
    <Loader />
  </div>
  <PokemonInfo
    :show="displayInfo"
    :pokemon="selectedPokemon"
    @close="hidePokemonInfo"
    @select-pokemon="displayPokemonInfo"
  />
</template>

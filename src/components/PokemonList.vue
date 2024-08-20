<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

import Loader from "./Loader.vue";
import PokemonCard from "./PokemonCard.vue";
import PokemonInfo from "./PokemonInfo.vue";
import PokemonSearch from "./PokemonSearch.vue";

import { fetchAllPokemons, fetchPokemonById } from "../helpers";

const pokemons = ref([]);
const visiblePokemons = ref([]);
const filteredPokemons = ref([]);
const itemsPerPage = 20;
const loading = ref(false);
const searchQuery = ref("");
const displayInfo = ref(false);
const selectedPokemon = ref(null);

const loadMorePokemons = () => {
  if (loading.value) return;
  loading.value = true;

  setTimeout(() => {
    const nextPokemons = filteredPokemons.value.slice(
      visiblePokemons.value.length,
      visiblePokemons.value.length + itemsPerPage,
    );
    visiblePokemons.value = [...visiblePokemons.value, ...nextPokemons];
    loading.value = false;
  }, 1000);
};

const filterPokemons = () => {
  if (searchQuery.value) {
    filteredPokemons.value = pokemons.value.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  } else {
    filteredPokemons.value = [...pokemons.value];
  }
  visiblePokemons.value = []; // Reset visible pokemons
  loadMorePokemons(); // Load initial set of filtered pokemons
};

// Handle search input
const onSearch = () => {
  filterPokemons();
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
    filterPokemons();
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
  <PokemonSearch v-model="searchQuery" @search="onSearch" />

  <div class="flex flex-col flex-wrap justify-center gap-6 sm:flex-row">
    <PokemonCard
      v-for="pokemon in visiblePokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      @select-pokemon="displayPokemonInfo"
    />
  </div>
  <div
    v-if="loading || visiblePokemons.length === 0"
    class="flex justify-center py-6"
  >
    <Loader />
  </div>
  <PokemonInfo
    :show="displayInfo"
    :pokemon="selectedPokemon"
    @close="hidePokemonInfo"
    @select-pokemon="displayPokemonInfo"
  />
</template>

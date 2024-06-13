<script setup>
import { fetchAllPokemons } from '../helpers';

import PokemonType from "./PokemonType.vue";

const pokemons = await fetchAllPokemons()

</script>

<template>
  <div
    class="group relative mt-14 min-w-[20%] cursor-pointer rounded-xl bg-white p-8 pt-10 shadow-lg shadow-[#EDEDED] transition-all duration-100 flex flex-col justify-center items-center gap-2"
    v-for="pokemon in pokemons" :key="pokemon.id">
    <img :src="pokemon.imageURL"
      class="absolute -top-14 transition-transform duration-100 group-hover:scale-110 z-[10]" />
    <span class="font-semibold text-sm text-[#888888]">N° {{ pokemon.id }}</span>
    <h3 class="font-bold text-lg capitalize line-clamp-1">{{ pokemon.name }}</h3>
    <div class="flex gap-2">
      <PokemonType v-for="pokeType in pokemon.types" :key="pokeType" :poke-type="pokeType" />
    </div>
  </div>
</template>

<style scoped>
img {
  image-rendering: pixelated;
}
</style>

<script setup>
import PokemonType from "./PokemonType.vue";

import { formatString, getPokemonImageURL } from "../helpers";

defineProps({
  pokemon: Object
})
</script>

<template>
  <div @click="$emit('openPokemonInfo')"
    class="group relative mt-14 min-w-[20%] w-full cursor-pointer rounded-xl bg-white p-8 pt-10 hover:shadow-lg shadow-[#EDEDED] transition-all duration-150 flex flex-col justify-center items-center gap-2 flex-[0.5]">
    <img :src="getPokemonImageURL(pokemon.id)"
      class="absolute -top-14 transition-transform duration-100 group-hover:scale-110 z-[10] text-xs"
      :alt="pokemon.name" />
    <span class="font-semibold text-sm text-[#888888]">N° {{ pokemon.id }}</span>
    <h2 class="font-bold text-lg capitalize line-clamp-1">{{ formatString(pokemon.name) }}</h2>
    <div class="flex gap-2">
      <PokemonType v-for="pokeType in pokemon.types" :key="pokeType" :poke-type="formatString(pokeType)" />
    </div>
  </div>
</template>

<style scoped></style>

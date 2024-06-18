<script setup>
import PokemonType from "./PokemonType.vue";

import { formatString, getPokemonImageURL } from "../helpers";

defineProps({
  pokemon: Object,
});
const emit = defineEmits(["selectPokemon"]);

const selectPokemon = async (id) => {
  await emit("selectPokemon", id);
};
</script>

<template>
  <div
    @click="selectPokemon(pokemon.id)"
    class="group relative mt-14 flex w-full min-w-[20%] flex-[0.5] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-white p-8 pt-10 shadow-[#EDEDED] transition-all duration-150 hover:shadow-lg"
  >
    <img
      :src="getPokemonImageURL(pokemon.id)"
      class="absolute -top-14 z-[10] text-xs transition-transform duration-100 group-hover:scale-110"
      :alt="pokemon.name"
    />
    <span class="text-sm font-semibold text-[#888888]">#{{ pokemon.id }}</span>
    <h2 class="line-clamp-1 text-lg font-bold capitalize">
      {{ formatString(pokemon.name) }}
    </h2>
    <div class="flex gap-2">
      <PokemonType
        v-for="pokeType in pokemon.types"
        :key="pokeType"
        :poke-type="formatString(pokeType)"
      />
    </div>
  </div>
</template>

<script setup>
import PokemonType from "./PokemonType.vue";

defineProps({
  pokeTypeColor: String,
  pokemon: Object
})
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <div
      class="group relative mt-14 min-w-[20%] cursor-pointer rounded-xl bg-white p-8 pt-10 shadow-lg shadow-[#EDEDED] transition-all duration-100 flex flex-col justify-center items-center gap-2">
      <img :src="pokemon.imageURL"
        class="absolute -top-14 transition-transform duration-100 group-hover:scale-110 z-[10]" />
      <span class="font-semibold text-sm text-[#888888]">N° {{ pokemon.id }}</span>
      <h3 class="font-bold line-clamp-1">{{ pokemon.name }}</h3>
      <div class="flex gap-2">
        <PokemonType v-for="pokeType in pokemon.types" :key="pokeType" :poke-type="pokeType" />
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  image-rendering: pixelated;
}
</style>

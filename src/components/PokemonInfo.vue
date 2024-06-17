<script setup>
import PokemonType from './PokemonType.vue';
import Loader from './Loader.vue'

import { extractAbilities, formatString, getPokemonAnimatedImageURL, increaseImageHeightInPx } from '../helpers';

const { show, pokemon } = defineProps({
  show: Boolean,
  pokemon: Object
})
// const pokemon = ref({
//   id: 26,
//   name: 'pikachu',
//   types: ['electric'],
//   description: 'When several of these pokémon gather, their electricity could build and cause lightning storms.',
//   height: `0.4m`,
//   weight: '6kg',
//   abilities: ['static', 'lightning-rod'],
//   stats: [{ name: 'HP', base_stat: 35 }, { name: 'ATK', base_stat: 55 }, { name: 'DEF', base_stat: 40 }, { name: 'SpA', base_stat: 50 }, { name: 'SpD', base_stat: 50 }, { name: 'SPD', base_stat: 90 }]
// })
const emit = defineEmits(['close'])

const closeInfo = () => {
  emit('close')
}
</script>

<template>
  {{ console.log({ pokemon, show }) }}
  <div v-if="show" class="pokemon-info-container" :class="show ? 'slide-in' : 'slide-out'">
    <span @click="closeInfo" class="pokemon-info-close-btn" aria-label="close">
      <img class="text-xs" src="/src/assets/close-icon.png" height="20px" width="20px" alt="close-icon" />
    </span>
    <div v-if="!pokemon" class="pokemon-info-wrapper pt-8">
      <Loader />
    </div>
    <div v-else class="pokemon-info-wrapper">
      <img class="pokemon-info-image" :src="getPokemonAnimatedImageURL(pokemon?.id)"
        :height="increaseImageHeightInPx(pokemon?.height)" width="150px" :alt="pokemon?.name" />
      <div class="pokemon-info">
        <div class="text-center flex flex-col items-center gap-2">
          <span class="font-semibold text-sm text-[#888888]">N° {{ pokemon?.id }}</span>
          <h2 class="font-bold text-xl capitalize line-clamp-1">{{ formatString(pokemon?.name) }}</h2>
          <div class="flex gap-2">
            <!-- <PokemonType v-for="pokeType in pokemon?.types" :key="pokeType" :poke-type="formatString(pokeType)" /> -->
          </div>
          <h3 class="pokemon-info-subtitle !mb-1">Pokedex Entry</h3>
          <!-- <p class="text-sm text-[#888888]">{{ pokemon?.description }}</p> -->
          <!-- size -->
          <div class="w-full flex justify-center items-center gap-4">
            <div class="w-full flex flex-col items-center mt-2">
              <h3 class="pokemon-info-subtitle">Height</h3>
              <p class="pokemon-info-size">{{ pokemon?.height }}</p>
            </div>
            <div class="w-full flex flex-col items-center mt-2">
              <h3 class="pokemon-info-subtitle">Weight</h3>
              <p class="pokemon-info-size">{{ pokemon?.weight }}</p>
            </div>
          </div>
          <!-- abilities -->
          <div class="w-full">
            <h3 class="pokemon-info-subtitle">Abilities</h3>
            <div class="w-full flex justify-center items-center gap-4">
              <p v-for="ability in extractAbilities(pokemon?.abilities)" :key="ability" class="pokemon-info-ability">
                {{ formatString(ability) }}
              </p>
            </div>
          </div>
          <!-- stats -->
          <!-- <div class="w-full">
            <h3 class="pokemon-info-subtitle">Stats</h3>
            <div class="flex justify-center items-center gap-2">
              <div v-for="stat in pokemon?.stats" :key="stat.name"
                class="flex flex-col items-center justify-center gap-1 bg-[#F6F8FC] p-1 rounded-full">
                <span
                  class="text-xs font-semibold bg-blue-500 text-[#F6F8FC] size-6 p-4 rounded-full grid place-content-center">
                  {{ stat.name }}
                </span>
                <span class="text-sm font-semibold">{{ stat.base_stat }}</span>
              </div>
            </div>
          </div> -->
          <!-- evolutions -->
          <!-- <div class="w-full">
            <h3 class="pokemon-info-subtitle">Evolution</h3>
            <div class="flex justify-center items-center gap-2">
              <img class="text-xs p-2 rounded-2xl hover:bg-[#F6F8FC] cursor-pointer" src="/src/assets/pokeball-icon.png"
                alt="name" height="80px" width="80px" />
              <span class="text-xs bg-[#F6F8FC] rounded-2xl font-semibold p-2">Lv. 16</span>
              <img class="text-xs p-2 rounded-2xl hover:bg-[#F6F8FC] cursor-pointer" src="/src/assets/pokeball-icon.png"
                alt="name" height="80px" width="80px" />
              <span class="text-xs bg-[#F6F8FC] rounded-2xl font-semibold p-2">Lv. 16</span>
              <img class="text-xs p-2 rounded-2xl hover:bg-[#F6F8FC] cursor-pointer" src="/src/assets/pokeball-icon.png"
                alt="name" height="80px" width="80px" />
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-info-container {
  @apply size-full fixed inset-x-0 bottom-0 z-10 bg-red-200
}

.pokemon-info-close-btn {
  @apply inline-block absolute right-8 top-6 text-xl font-bold bg-black/30 p-2 rounded-xl cursor-pointer hover:bg-black/40 transition-colors duration-150
}

.pokemon-info-wrapper {
  @apply bg-white h-[80dvh] absolute bottom-0 w-full inset-x-0 rounded-t-2xl flex flex-col items-center
}

.pokemon-info {
  @apply h-full w-full mt-10 pt-1 px-8 pb-6 overflow-y-auto overflow-x-hidden
}

.pokemon-info::-webkit-scrollbar {
  @apply w-1 px-10
}

.pokemon-info::-webkit-scrollbar-track {
  @apply rounded-full shadow-inner shadow-[#242424]
}

.pokemon-info::-webkit-scrollbar-thumb {
  @apply rounded-full bg-[#888888]
}

.pokemon-info-image {
  @apply absolute bottom-[75dvh] inset-x-0 mx-auto
}

.pokemon-info-subtitle {
  @apply mt-6 mb-2 font-bold text-sm
}

.pokemon-info-size, .pokemon-info-ability {
  @apply w-full bg-[#F6F8FC] capitalize py-2 rounded-xl min-w-[30%]
}

.slide-out {
  animation: slideOut ease-in-out 0.35s;
  animation-fill-mode: forwards;
}

.slide-in {
  animation: slideIn ease-in-out 0.35s;
  animation-fill-mode: forwards;
}

@keyframes slideOut {
  0% {
    bottom: 0
  }

  100% {
    bottom: -100vh
  }
}

@keyframes slideIn {
  0% {
    bottom: -100vh
  }

  100% {
    bottom: 0
  }
}
</style>
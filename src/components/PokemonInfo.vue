<script setup>
import Loader from "./Loader.vue";
import PokemonType from "./PokemonType.vue";

import { POKEMON_STAT_COLORS, POKEMON_TYPE_COLORS } from "../constants";
import {
  getPokemonAnimatedImageURL,
  getPokemonImageURL,
  increaseImageHeightInPx,
} from "../helpers";

const { show, pokemon } = defineProps({
  show: Boolean,
  pokemon: Object,
});

const emit = defineEmits(["close", "selectPokemon"]);

const closeInfo = () => {
  emit("close");
};

const selectPokemon = async (id) => {
  await emit("selectPokemon", id);
};
</script>

<template>
  <div
    v-if="show"
    class="pokemon-info-container"
    :class="show ? 'slide-in' : 'slide-out'"
    :style="{ backgroundColor: POKEMON_TYPE_COLORS[pokemon?.types[0]] }"
  >
    <span @click="closeInfo" class="pokemon-info-close-btn" aria-label="close">
      <img
        class="text-xs"
        src="/src/assets/close-icon.png"
        height="20px"
        width="20px"
        alt="close-icon"
      />
    </span>
    <div v-if="!pokemon" class="pokemon-info-wrapper pt-8">
      <Loader />
    </div>
    <div v-else class="pokemon-info-wrapper">
      <img
        class="pokemon-info-image"
        :src="getPokemonAnimatedImageURL(pokemon?.id)"
        :height="increaseImageHeightInPx(pokemon?.height)"
        width="150px"
        :alt="pokemon?.name"
      />
      <div class="pokemon-info">
        <div class="flex flex-col items-center gap-2 text-center">
          <span class="text-sm font-semibold text-[#888888]"
            >#{{ pokemon?.id }}</span
          >
          <h2 class="line-clamp-1 text-xl font-bold capitalize">
            {{ pokemon?.name }}
          </h2>
          <div class="flex gap-2">
            <PokemonType
              v-for="pokeType in pokemon?.types"
              :key="pokeType"
              :poke-type="pokeType"
            />
          </div>
          <h3 class="pokemon-info-subtitle !mb-1">Pokedex Entry</h3>
          <p class="text-sm text-[#888888]">
            {{ pokemon?.description }}
          </p>
          <!-- size -->
          <div class="flex w-full items-center justify-center gap-4">
            <div class="mt-2 flex w-full flex-col items-center">
              <h3 class="pokemon-info-subtitle">Height</h3>
              <p class="pokemon-info-size">{{ pokemon?.height }}</p>
            </div>
            <div class="mt-2 flex w-full flex-col items-center">
              <h3 class="pokemon-info-subtitle">Weight</h3>
              <p class="pokemon-info-size">{{ pokemon?.weight }}</p>
            </div>
          </div>
          <!-- abilities -->
          <div class="w-full">
            <h3 class="pokemon-info-subtitle">Abilities</h3>
            <div class="flex w-full items-center justify-center gap-4">
              <p
                v-for="ability in pokemon?.abilities"
                :key="ability"
                class="pokemon-info-ability"
              >
                {{ ability }}
              </p>
            </div>
          </div>
          <!-- stats -->
          <div class="w-full">
            <h3 class="pokemon-info-subtitle">Stats</h3>
            <div class="flex items-center justify-center gap-2">
              <div
                v-for="stat in pokemon?.stats"
                :key="stat.name"
                class="flex flex-col items-center justify-center gap-1 rounded-full bg-[#F6F8FC] p-1"
              >
                <span
                  class="grid size-6 place-content-center rounded-full p-4 text-xs font-semibold text-[#F6F8FC]"
                  :style="{ backgroundColor: POKEMON_STAT_COLORS[stat.name] }"
                  :aria-label="stat.name"
                >
                  {{ stat.name }}
                </span>
                <span class="text-sm font-semibold">{{ stat.base_stat }}</span>
              </div>
            </div>
          </div>
          <!-- evolutions -->
          <div class="w-full">
            <h3 class="pokemon-info-subtitle">Evolutions</h3>
            <div class="flex items-center justify-center gap-2">
              <span
                v-for="(chain, index) in pokemon?.evolution_chain"
                class="flex items-center justify-center gap-2"
              >
                <span
                  v-if="index > 0"
                  class="rounded-2xl p-2 text-xl font-semibold"
                >
                  &gt;
                </span>
                <span v-if="chain?.id" @click="selectPokemon(chain.id)">
                  <img
                    :src="getPokemonImageURL(chain.id)"
                    class="cursor-pointer rounded-2xl border border-[#F6F8FC] p-2 text-xs hover:bg-[#F6F8FC]"
                    :alt="chain?.name"
                    height="80px"
                    width="80px"
                  />
                  <span class="text-xs">{{ chain.name }}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pokemon-info-container {
  @apply fixed inset-x-0 bottom-0 z-10 size-full bg-[#F6F8FC];
}

.pokemon-info-close-btn {
  @apply absolute right-8 top-6 inline-block cursor-pointer rounded-xl bg-black/30 p-2 text-xl font-bold transition-colors duration-150 hover:bg-black/40;
}

.pokemon-info-wrapper {
  @apply absolute inset-x-0 bottom-0 mx-auto flex h-[80dvh] w-full max-w-3xl flex-col items-center rounded-t-2xl bg-white shadow-xl shadow-[#888888];
}

.pokemon-info {
  @apply mt-10 h-full w-full overflow-y-auto overflow-x-hidden px-8 pb-6 pt-1;
}

.pokemon-info::-webkit-scrollbar {
  @apply w-1 px-10;
}

.pokemon-info::-webkit-scrollbar-track {
  @apply rounded-full shadow-inner shadow-[#242424];
}

.pokemon-info::-webkit-scrollbar-thumb {
  @apply rounded-full bg-[#888888];
}

.pokemon-info-image {
  @apply absolute inset-x-0 bottom-[75dvh] mx-auto;
}

.pokemon-info-subtitle {
  @apply mb-2 mt-6 text-sm font-bold;
}

.pokemon-info-desc {
  @apply inline-block first-letter:capitalize;
}

.pokemon-info-size,
.pokemon-info-ability {
  @apply w-full min-w-[30%] rounded-xl bg-[#F6F8FC] py-2 capitalize;
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
    bottom: 0;
  }

  100% {
    bottom: -100vh;
  }
}

@keyframes slideIn {
  0% {
    bottom: -100vh;
  }

  100% {
    bottom: 0;
  }
}
</style>

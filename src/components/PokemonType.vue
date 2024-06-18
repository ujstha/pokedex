<script setup>
import { POKEMON_TYPE_COLORS } from "../constants";
import { toLowerCase } from "../helpers";

defineProps({
  pokeType: String,
});
</script>

<template>
  <div
    class="rounded-md px-2 py-1 text-xs font-medium capitalize text-white"
    :style="{
      background: `linear-gradient(180deg, ${POKEMON_TYPE_COLORS[toLowerCase(pokeType)]} 50%, ${POKEMON_TYPE_COLORS[toLowerCase(pokeType)]} 50%)`,
      backgroundColor: POKEMON_TYPE_COLORS[toLowerCase(pokeType)],
    }"
  >
    {{ pokeType }}
  </div>
</template>

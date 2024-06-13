<script setup>
import { POKEMON_TYPE_COLORS } from '../constants';
import { toLowerCase } from '../helpers';

defineProps({
  pokeType: String
})
</script>

<template>
  <div class="rounded-lg px-2 py-1 text-xs font-semibold"
    :style="{ background: POKEMON_TYPE_COLORS[toLowerCase(pokeType)] }">
    {{ pokeType }}
  </div>
</template>
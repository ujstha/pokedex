<script setup>
defineProps({
  pokeType: String
})
</script>

<template>
  <div class="rounded-lg px-2 py-1 text-sm font-semibold">
    {{ pokeType }}
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const { modelValue } = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue", "search"]);

const internalValue = ref(modelValue);

watch(internalValue, (newValue) => {
  emits("update:modelValue", newValue);
});

const searchPokemon = () => {
  emits("search");
};
</script>

<template>
  <div class="relative">
    <input
      type="search"
      v-model="internalValue"
      @input="searchPokemon"
      @keyup.enter="searchPokemon"
      placeholder="Search your Pokemon"
      class="w-full rounded-xl bg-white py-4 pl-3 pr-10 outline-none transition-all duration-200 focus:outline-blue-500/90 sm:py-5 sm:pl-5 sm:pr-14"
    />
    <span
      class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-xl bg-blue-500 p-2 text-white transition-all duration-200 hover:bg-blue-600"
      aria-label="search"
      @click="searchPokemon"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 50 50"
        width="25px"
        height="25px"
      >
        <path
          d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
        />
      </svg>
    </span>
  </div>
</template>

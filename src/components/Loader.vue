<template>
  <img
    src="../assets/pokeball-icon.png"
    class="loading-ball brightness-75"
    height="60"
    width="60"
    alt="Pokeball Loader"
  />
</template>

<style scoped>
.loading-ball {
  animation: rotatePokeBall ease-in-out 3s infinite;
}

@keyframes rotatePokeBall {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

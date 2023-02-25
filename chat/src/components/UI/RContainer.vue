<template>
  <v-container class="main-container">
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  name: "RContainer"
}
</script>

<style scoped>
.main-container {
  backdrop-filter: blur(10px);
  background: rgba(7,18,25,.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  width: auto;
  max-width: 100%;
  height: auto;
}
</style>

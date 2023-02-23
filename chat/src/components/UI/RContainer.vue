<template>
  <v-container class="main-container"></v-container>
</template>

<script>
export default {
  name: "RContainer"
}
</script>

<style scoped>
.main-container {
  backdrop-filter: blur(kawase 3);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  width: 100%;
  min-width: 98vw;
  min-height: 90vh;
}
</style>

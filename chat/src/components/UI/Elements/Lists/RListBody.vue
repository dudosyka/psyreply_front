<template>
  <v-list class="list-body">
    <slot></slot>
  </v-list>
</template>

<script>
export default {
  name: "RListBody"
}
</script>

<style scoped>
.list-body {
  background-color: rgba(5, 8, 12, 0.55);
  color: white;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>

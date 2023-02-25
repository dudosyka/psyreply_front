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
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  border-radius: 1rem 0rem 0rem 1rem;
  border: 1px solid var(--border-dark);
  border-right: none;
  padding-top: 0;
  padding-bottom: 0;
  box-shadow: none!important;
  max-height: 60vh;
  width: 18vw;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

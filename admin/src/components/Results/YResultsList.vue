<template>
<ul class="results__list">
  <slot></slot>
</ul>
</template>

<script>
export default {
  name: "YResultsList"
}
</script>

<style scoped>
.results__list {
  display: grid;
  grid-gap: 1rem;
  list-style: none;
}
</style>
<template>
  <div class="y-results-table">
    <slot></slot>
  </div>

</template>

<script>
export default {
  name: "YResultsTabel"
}
</script>

<style scoped>
.y-results-table{
  display: grid;
  grid-gap: 1rem;
}

</style>

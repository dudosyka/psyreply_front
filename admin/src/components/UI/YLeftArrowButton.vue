<template>
  <button class="button"></button>
</template>

<script>
export default {
  name: "YLeftArrowButton"
}
</script>

<style scoped>
.button {
  background: url("@/assets/img/arrow.svg") no-repeat;
  width: 28px;
  height: 28px;
}
.button:hover {
  cursor: pointer;
}
</style>

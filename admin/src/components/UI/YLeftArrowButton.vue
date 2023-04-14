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
    width: 18px;
    height: 18px;
    background-size: contain;
}

.button:hover {
    cursor: pointer;
}
</style>

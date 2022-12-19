<template>
  <button class="button button_cool">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "YCoolButton"
}
</script>

<style scoped>
.button_cool {
  padding: 1.09375rem 1rem;
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  box-shadow: -10px 11px 20px rgba(221, 126, 255, 0.35);
  border-radius: .75rem;
  font-size: 1.0625rem;
  color: var(--light);
  font-weight: 500;
  transition: background .3s ease-in-out;
}
.button_cool:hover {
  cursor: pointer;
  background: linear-gradient(200.42deg, #B275FF 13.57%, #C247ED 98.35%);
}
.button_cool:active {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
}
</style>

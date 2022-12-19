<template>
  <button class="button" :class="{ 'button_active': active }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "YMiniButton",
  props: {
    active: Boolean
  }
}
</script>

<style scoped>
.button {
  font-size: 1.25rem;
  color: var(--light);
  padding: .3rem 1rem;
  border-radius: .4rem;
  border: 1px solid rgba(255, 255, 255, 0);
  border-top-color: rgba(255, 255, 255, 0.5);
  border-bottom-color: rgba(255, 255, 255, 0.54);
  background: rgba(255, 255, 255, 0.16);
  white-space: nowrap;
}
.button:hover {
  cursor: pointer;
}
.button_active {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
}

</style>

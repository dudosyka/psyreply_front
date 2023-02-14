<template>
  <button type="button" class="btn btn-outline-secondary">
    <slot></slot>
    <span v-if="plus" class="button__symbol">+</span>
  </button>
</template>

<script>
export default {
  name: "YButton",
  props:{
    plus:{
      type: Boolean,
      default: false
    },
    enroll:{
      type: Boolean,
      default: false
    },
  }
}

</script>

<style scoped>
.btn {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 0;
  color: var(--inactive-color);
  text-transform: none;
  width: 7vw;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0.5rem;
  transition: 0.3s;
  max-height: fit-content;
}
.btn:hover {
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  border: none;
  max-height: fit-content;
  color: rgba(255, 255, 255, 1);
}
..btn:focus {
  background: transparent;
  box-shadow: none;
  max-height: fit-content;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.btn:active {
  background: transparent;
  box-shadow: none;
  max-height: fit-content;
  border-radius: 0;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.button__symbol {
  margin-left: .6rem;
  font-weight: 600;
}
</style>

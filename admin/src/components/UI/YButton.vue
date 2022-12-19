<template>
  <button class="button">
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
.button {
  font-size: 1.25rem;
  color: var(--light);
  padding: .3rem 1rem;
  border-radius: .875rem;
  border: 1px solid rgba(255, 255, 255, 0);
  border-top-color: rgba(255, 255, 255, 0.5);
  border-bottom-color: rgba(255, 255, 255, 0.54);
  background: rgba(255, 255, 255, 0.16);
  white-space: nowrap;
}
.button:hover {
  cursor: pointer;
}
.button__symbol {
  margin-left: .6rem;
  font-weight: 600;
}
</style>

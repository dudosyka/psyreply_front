<template>
  <article class="modal">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: "YModal",
  props: {
    header: {
      type: Boolean,
      default: false
    }
  }
}

</script>

<style scoped>
.modal {
  background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.25) 2.81%, hsla(0, 0%, 100%, 0.1) 100.82%);
  padding: 3.0625rem 3.0625rem 5.5625rem;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 1rem;
  border-color: var(--light-opacity);
  border-width: 2px;
  border-style: solid;
}
</style>

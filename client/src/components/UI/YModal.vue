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
  background: transparent;
  padding: 3.0625rem 3.0625rem  1.0625rem;
  border-radius: 3rem;
  border-width: 0.125rem;
  width: 100%;
  min-width: 63.75rem;
}
@media screen and (max-width:820px) {
  .modal {
    background: none;
    padding: 3.0625rem 3.0625rem  1.0625rem;
    box-shadow: none;
    border-radius: 3rem;
    border-color: rgba(0, 0, 0, 0);
    width: 100%;
    min-width: auto;

  }
}
</style>

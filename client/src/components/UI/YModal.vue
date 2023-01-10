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
  padding: 3.0625rem 3.0625rem  1.0625rem;
  box-shadow: 0 0.25rem 3.25rem hsla(274, 100%, 50%, 0.11);
  border-radius: 3rem;
  border-color: var(--light-opacity);
  border-width: 0.125rem;
  border-style: solid;
  width: 100%;
  min-width: 63.75rem;
}
@media screen and (max-width:820px) {
  .modal {

    background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.25) 2.81%, hsla(0, 0%, 100%, 0.1) 100.82%);
    padding: 3.0625rem 3.0625rem  1.0625rem;
    box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
    border-radius: 3rem;
    border-color: rgba(0, 0, 0, 0);
    border-top-color:var(--light-opacity) ;
    width: 100%;
    border-bottom-left-radius: 0rem;
    border-bottom-right-radius: 0rem;
    min-width: auto;
  }
}
</style>

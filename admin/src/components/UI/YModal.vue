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
  background: rgba(7, 18, 25, 0.75);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  padding: 3.0625rem 3.0625rem 5.5625rem;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
}
</style>

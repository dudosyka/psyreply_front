<template>
  <article class="modal disable">
    <y-left-side-bar />
    <slot></slot>
  </article>
</template>

<script>
import YLeftSideBar from "@/components/UI/YLeftSideBar.vue";
export default {
  name: "YModal",
  components: {
    YLeftSideBar,
  },
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
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  gap: 1rem;
  align-items: center;
  display: flex;
  width: 70vw;
  grid-gap: 2.5625rem;
  flex-direction: row;
}
</style>

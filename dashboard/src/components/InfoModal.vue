<template>
  <div class="container-fluid modal-overlay animate__animated animate__fadeIn">
    <div class="container modal-body animate__animated animate__slideInUp">
      <h3 class="modal-heading">Описание</h3>
      <p class="modal-text"> {{getDescription}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoModal",
  computed:{
    getDescription(){
      const data = this.$store.getters.showedInfoModalData
      return data.description
    },
  }
}
</script>

<style scoped>
.modal-text {
  text-align: left;
}
.modal-heading {
  text-align: left;
}
.container.modal-body {
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 4rem;
  width: 90vw;
  height: 40vh;
  border: 1px solid var(--border-dark);
  border-radius: 30px;
  justify-content: flex-start;
}
.container-fluid.modal-overlay {
  background-color: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px);
  background-image: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  z-index: 9999;
}
</style>
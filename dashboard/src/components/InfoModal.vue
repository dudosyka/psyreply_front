<template>
  <div class="container-fluid modal-overlay animate__animated animate__fadeIn">
    <div class="container modal-body animate__animated animate__slideInUp">
      <div class="row">
        <h3 class="modal-heading">Описание</h3>
        <button class="btn"><i class="fa-solid fa-xmark close"></i></button>
      </div>
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
.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid;
  border-color: var(--border-dark);
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}
.btn {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1)!important;
  z-index: 999;
  width: 2rem;
}
.btn:hover {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.btn:focus {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.btn:active {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.btn:focus-visible {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.modal-text {
  text-align: left;
}
.modal-heading {
  text-align: left;
  width: 100%;
  max-width: 30vw;
}
.container.modal-body {
  background-color: #000000b8;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 100%;
  max-width: 43vw;
  height: auto;
  /* min-height: 31vh; */
  max-height: 48vh;
  border: 1px solid var(--border-dark);
  border-radius: 30px;
  justify-content: center;
}
.container-fluid.modal-overlay {
  background-color: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px);
  background-image: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
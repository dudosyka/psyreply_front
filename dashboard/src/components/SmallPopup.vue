
<template>
    <div class="container-fluid modal-overlay" >
      <div class="container modal-body animate__animated animate__slideInUp">
        <div class="row">
          <h3 class="modal-heading">Уведомление</h3>
        </div>
        <p class="modal-text"> Ссылка скопирована
        </p>
      </div>
    </div>
  </template>

<script>
export default {
  name: "SmallPopup"
}
</script>

<style scoped>
*{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.row {
  display: flex;
  justify-content: space-between;
  width: 10%;
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
  width: 10%;
  max-width: 30vw;
}
.container.modal-body {
  background-color: #000000b8;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  width: 20%;
  max-width: 50vw;
  height: auto;
  /* min-height: 31vh; */
  max-height: 18vh;
  border: 1px solid var(--border-dark);
  border-radius: 30px;
  justify-content: center;
}
.container-fluid.modal-overlay {
  background-color: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(10px);
  background-image: none;
  width: 30vw;
  height: 18vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
<template>
    <div class="container-fluid modal-overlay">
      <Transition enter-active-class="animate__animated animate__slideInUp" leave-active-class="animate__animated animate__slideOutDown">
      <div class="container modal-body">
        <div class="row">
          <h5 class="modal-heading">Уведомление</h5>
        </div>
        <p class="modal-text">
          Ссылка скопирована
        </p>
      </div>
      </Transition>
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
  width: 100%;
  border-bottom: 1px solid;
  border-color: var(--border-dark);
  margin-bottom: 1rem;

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
  text-align: center;
  font-weight: 400;
}
.modal-heading {
  text-align: center;
}
.container.modal-body {
  background-color: #000000b8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  text-align: center;
  width: 20%;
  max-width: 50vw;
  height: auto;
  /* min-height: 31vh; */
  max-height: 18vh;
  border: 1px solid var(--border-dark);
  border-radius: 1rem;
  justify-content: center;
}
.container-fluid.modal-overlay {
  background-color: transparent;
  border: none;
  backdrop-filter: none;
  background-image: none;
  width: 30vw;
  height: auto;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
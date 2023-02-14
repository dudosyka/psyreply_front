<template>
  <button :disabled="disabled" class="btn" :class="{ 'button_active': active }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "YMiniButton",
  props: {
    active: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.btn {
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--border-dark);
  border-radius: 0.5rem;
  color: white;
  min-height: 2rem;
  text-transform: none;
  max-width: 15vw;
  width: 12vw;
  padding-top: 0.5rem!important;
  padding-bottom: 0.5rem!important;
  padding-left: 0.7rem!important;
  padding-right: 0.7rem!important;
  margin-left: 0.5rem;
  transition: all .3s;
}
.btn:hover {
  cursor: pointer;
  background: transparent;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 0.5rem;
  color: white;
  min-height: 2rem;
  text-transform: none;
  max-width: 15vw;
  padding-top: 0.5rem!important;
  padding-bottom: 0.5rem!important;
  padding-left: 0.7rem!important;
  padding-right: 0.7rem!important;
  margin-left: 0.5rem;
  width: 12vw;
  transition: background .3s ease-in-out;
}
.btn:active {
  background: mediumvioletred;
  box-shadow: none;
  border: 1px solid var(--border-dark);
  border-radius: 0.5rem;
  color: white;
  min-height: 2rem;
  text-transform: none;
  max-width: 15vw;
  width: 12vw;
  padding-top: 0.5rem!important;
  padding-bottom: 0.5rem!important;
  padding-left: 0.7rem!important;
  padding-right: 0.7rem!important;
  margin-left: 0.5rem;
  transition: background .3s ease-in-out;
}
.btn:focus {
  background: mediumvioletred;
  box-shadow: none;
  border: 1px solid var(--border-dark);
  border-radius: 0.5rem;
  color: white;
  min-height: 2rem;
  text-transform: none;
  width: 12vw;
  max-width: 15vw;
  padding-top: 0.5rem!important;
  padding-bottom: 0.5rem!important;
  padding-left: 0.7rem!important;
  padding-right: 0.7rem!important;
  margin-left: 0.5rem!important;
  transition: background .3s ease-in-out;
}
.button_active {
  background: mediumvioletred;
  box-shadow: none;
  border: 1px solid var(--border-dark);
  border-radius: 0.5rem;
  color: white;
  min-height: 2rem;
  text-transform: none;
  width: 12vw;
  max-width: 15vw;
  padding-top: 0.5rem!important;
  padding-bottom: 0.5rem!important;
  padding-left: 0.7rem!important;
  padding-right: 0.7rem!important;
  margin-left: 0.5rem!important;
  transition: background .3s ease-in-out;
}
</style>

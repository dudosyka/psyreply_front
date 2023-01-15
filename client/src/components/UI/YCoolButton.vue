<template>
  <button class="button button_cool" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "YCoolButton",
  props: {
    disabled: Boolean
  }
}
</script>

<style scoped>
.button_cool {
  padding: 1.09375rem 1rem;
  background: linear-gradient(200.42deg, #844FFC 13.57%, #491EB8 98.35%);
  box-shadow: -10px 19px 20px rgba(43, 9, 120, 0.35);
  border-radius: 1.1rem;
  font-size: 1.025rem;
  color: var(--light);
  height: 100%;
  max-height: 51.72px;
  font-weight: 500;
  transition: background .3s ease-in-out, opacity .3s ease-in-out;
  min-width: 31vw;
}
.button_cool:hover {
  cursor: pointer;
  background: linear-gradient(200.42deg, #844FFC 13.57%, #5924e2 98.35%);
}
.button_cool:active {
  background: linear-gradient(200.42deg, #844FFC 13.57%, #4e0fea 98.35%);
}
.button_cool:disabled {
  opacity: .5;
}
@media screen and (max-width:820px){
  .button_cool {
    padding: 2.09375rem 1.5rem;
    background: linear-gradient(200.42deg, #844FFC 13.57%, #491EB8 98.35%);
    box-shadow: -10px 19px 20px rgba(43, 9, 120, 0.35);
    border-radius: 2rem;
    font-size: 2.5rem;
    height: 100%;
    max-height: 51.72px;
    color: var(--light);
    font-weight: 500;
    min-width: 80vw;
  }
}
</style>

<template>
<div class="YAnswerItem">
  <div class="item" :class="{ 'item-active': active }">
    <div class="item__text">
      <slot></slot>
    </div>
    <div
      class="item__elipce"
      :class="{ 'item__elipce--active': active }"
    ></div>
  </div>

  <hr v-if="!last">
</div>
</template>

<script>
export default {
  name: "YAnswersItem",
  props: {
    active: Boolean,
    last: Boolean
  }
}
</script>

<style scoped>
.item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #00000042;
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 5px;
  border-radius: 20px;
  border: 1px solid #ffffff61;
}
.item__text{
  width: 25rem;
  font-size: 2.5rem;
  padding-top: 5px;
  padding-bottom: 10px;
}
.item__elipce{
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  background-color: rgba(217, 217, 217, 0.17);;
}
.item__elipce--active {
  background-color: hsl(137, 100%, 65%);
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-width: 30vw;
  border-left: 0px solid white;
  border-right: 0px solid white;
  border-bottom: 0px solid white;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}
.item-active {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #00000042;
  padding-left: 20px;
  padding-right: 10px;
  padding-top: 5px;
  border-radius: 20px;
  border: 1px solid #ffffff61;
}
</style>

<template>
  <input
    type="range"
    :step="step"
    :max="max"
    :min="min"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>

export default {
  name:"YRange",
  props: {
    max: Number,
    min: Number,
    step: Number,
    value: Number
  }
}
</script>

<style scoped>
@media screen and (max-width:820px){
  input[type=range]{
    min-width: 80vw!important;
    height: 7px;
    color: #4e0fea;
    -webkit-appearance: none !important;
    background: linear-gradient(90deg, #667EEA 1.25%, #764BA2 100.38%);
    box-shadow: 0px 0px 8px #764BA2;
    border-radius: 40px;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    background-image: url("https://malinka.psyreply.com/img/range.svg");
    height: 27px;
    width: 27px;
  }
}
input[type=range]{
  min-width: 31vw;
  height: 7px;
  color: #4e0fea;
  -webkit-appearance: none !important;
  background: linear-gradient(90deg, #667EEA 1.25%, #764BA2 100.38%);
  box-shadow: 0px 0px 8px #764BA2;
  border-radius: 40px;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  background-image: url("https://malinka.psyreply.com/img/range.svg");
  height: 27px;
  width: 27px;
}
</style>

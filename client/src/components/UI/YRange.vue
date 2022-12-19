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
.Yrange__input[type=range]{
  width: 20rem;
  color: #4e0fea;
}
</style>

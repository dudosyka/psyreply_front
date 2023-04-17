<template>
  <textarea
          @input="$emit('update:modelValue', $event.target.value)"
          class="input"
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          :disabled="disabled"
          :rows="rows"
  ></textarea>
</template>

<script>
export default {
  name: "YInputTextarea",
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    max: {
      default: 0
    },
    min: {
      default: 0
    },
    disabled: {
      default: false,
    },
    rows: {
      default: 10,
    },
    modelValue: [String, Number]
  },
}
</script>

<style scoped>
.input {
    background: rgba(7, 18, 25, 0.75);
    color: var(--light);
    border-color: var(--border-dark);
    border-width: 1px;
    border-style: solid;
    border-radius: 0.3rem;
    text-align: center;
    transition: all .3s ease-in-out;
}
.input::placeholder {
}
.input:hover {
    background: rgba(7, 18, 25, 0.75);
    color: var(--light);
    border-color: var(--border-dark);
    border-width: 1px;
    border-style: solid;
    border-radius: 0.3rem;
    text-align: center;
    transition: all .3s ease-in-out;
}

.input:invalid {
    background-color: hsla(0, 83%, 41%, 0.89);
}

::placeholder {
    font-style: italic;
    color: rgba(255, 255, 255, 0.53);
}
</style>

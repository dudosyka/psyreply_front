<template>
  <slot></slot>
</template>

<script>
export default {
  name: "RUpdatableContainer",
  emits: {
    updated: {},
    created: {}
  },
  created() {
    this.$emit('created')
  },
  updated() {
    this.$emit('updated')
  }
}
</script>

<style scoped>

</style>

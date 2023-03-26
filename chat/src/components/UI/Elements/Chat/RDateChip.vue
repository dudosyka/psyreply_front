<template>
  <v-row
    justify="center"
  >
    <v-chip
      class="ma-2"
      color="secondary"
    >
      {{ value }}
    </v-chip>
  </v-row>
</template>

<script>
export default {
  name: "RDateChip",
  props: {
    value: {
      type: String,
      default: () => ""
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-row
    class="chip-row"
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
.chip-row {
  margin-top: 5rem;
}
.chip-row:first-child {
  margin-top: 0!important;
  margin-bottom: 0!important;
}
</style>

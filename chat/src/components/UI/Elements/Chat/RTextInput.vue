<template>
  <v-textarea
    class="mx-2 text-area"
    label="Введите сообщение"
    rows="1"
  ></v-textarea>
</template>

<script>
export default {
  name: "RTextInput"
}
</script>

<style scoped>
.text-area {
  margin-bottom: 0;
}
.v-text-field .v-input__details {
  display: none!important;
}
</style>

<template>
  <!--  Здесь есть параметры, которые я тоже не разобрался как передать в конкретные места.
        К примеру, ниже заданы параметры для зоны с чатом
        Но для колонки с контактами, где поиск сверху, эта форма должна иметь следующие параметры:

        label="Поиск"
        :rules="rules"
        hide-details="auto"
        append-inner-icon="mdi-text-search"-->
  <v-textarea
    :label="placeholder"
    auto-grow
    variant="outlined"
    :rows="startRows"
    :focused="focused"
    max-rows="3"
    row-height="40"
  ></v-textarea>
</template>

<script>
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";

export default {
  name: "RTextInput",
  props: {
    placeholder: {
      type: String,
      default: () => ""
    },
    focused: {
      type: Boolean,
      default: () => false
    },
    startRows: {
      type: Number,
      default: () => 1
    }
  },
  components: {RButton}
}
</script>

<style scoped>
.v-input__details {
  display: none !important;
}
</style>

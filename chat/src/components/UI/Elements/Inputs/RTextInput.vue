<template>
  <!--  Здесь есть параметры, которые я тоже не разобрался как передать в конкретные места.
        К примеру, ниже заданы параметры для зоны с чатом
        Но для колонки с контактами, где поиск сверху, эта форма должна иметь следующие параметры:

        label="Поиск"
        :rules="rules"
        hide-details="auto"
        append-inner-icon="mdi-text-search"-->
  <v-textarea
    className="mx2 text-area"
    rows="2"
    hide-details
    auto-grow
    clearable
    label="Сообщение...">

  </v-textarea>
</template>

<script>
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";

export default {
  name: "RTextInput",
  components: {RButton}
}
</script>

<style scoped>
.hr {
  margin-bottom: 2rem;
}

.text-area {
  margin-bottom: 0;
  max-height: 10rem;
  padding-bottom: 0 !important;
  overflow-y: scroll;
  background: transparent;
}

.v-text-field .v-input__details {
  display: none !important;
}
</style>

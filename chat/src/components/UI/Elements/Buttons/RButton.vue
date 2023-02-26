<template>
  <v-btn
    class="ma-2 btn"
    color="transparent"
  >
<!--    Вот здесь можно передавать иконку, я правда не смог реализовать замену. Для привязки файла иконка называется "mdi-paperclip".-->
<!--    Другие иконки можно глянуть здесь https://pictogrammers.com/library/mdi/-->

<!--    Иконки, которые мы пока юзаем:-->
<!--    Привязка файла - "mdi-paperclip"-->
<!--    Запись голосового - "mdi-microphone"-->
<!--    Дашборд - "mdi-monitor-account"-->
    <v-icon
      icon="mdi-microphone"
    ></v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "RButton"
}
</script>

<style scoped>
.btn {
  padding: 0!important;
  border-radius: 50%;
  width: 4rem!important;
  height: 4rem!important;
  font-size: 1.5rem;
  box-shadow: none;
}
</style>

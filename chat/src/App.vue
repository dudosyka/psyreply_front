<template>
  <router-view />
</template>

<script lang="ts" setup>
  //
</script>

<style>
:root {
  --acrylic-blur-dark: rgb(7 8 12 / 53%);
  --acrylic-blur-light: rgba(17, 25, 40, 0.75);/*Прозрачный фон всех элементов*/
  --border-dark: rgba(113 119 144 / 25%);
  --border-light: rgb(113 119 144 / 12%);/*Обводка*/
  --content-bg-dark: rgb(146 151 179 / 13%); /*Второй фон для всех элементов*/
  --inactive-color: rgb(113 119 144 / 78%); /*Цвет неактивных ссылок*/
  --active-color: #faf9fb; /*Цвет активных ссылок*/
}
#app {
  background-image: url("assets/bg.png");
}
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(184, 192, 194, 0.47) rgba(50, 50, 50, 0.29);
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  width: 0.3rem;
  margin-left: 1rem;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  margin-left: 3.5rem;
  margin-right: 4rem;
  background-color: #323232;
}

*::-webkit-scrollbar-track:hover {
  background-color: rgba(50, 50, 50, 0.29);
}

*::-webkit-scrollbar-track:active {
  background-color: rgba(50, 50, 50, 0.29);
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(184, 192, 194, 0.47);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(184, 192, 194, 0.47);
}

*::-webkit-scrollbar-thumb:active {
  background-color: rgba(184, 192, 194, 0.47);
}
</style>

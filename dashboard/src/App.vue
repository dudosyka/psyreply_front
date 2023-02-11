<template>
  <div class="container-fluid animate__animated animate__fadeIn">
  </div>
  <router-view />
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    >
    <info-modal v-if="getShowInfoModal"></info-modal>
  </Transition>
</template>

<script>

import InfoModal from "@/components/InfoModal.vue";

export default {
  name: 'App',
  components: {
    InfoModal

  },
  computed:{
    getShowInfoModal(){
      const show = this.$store.getters.showedInfoModal
      return show
    }
  }
}
</script>

<style>
/*Ипортирую шрифт Rubik во всех начертаниях*/
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/*Переменные с цветами для элементов*/
:root {
  --acrylic-blur-dark: rgb(7 8 12 / 53%);
  --acrylic-blur-light: rgba(17, 25, 40, 0.75);/*Прозрачный фон всех элементов*/
  --border-dark: rgba(113 119 144 / 25%);
  --border-light: rgb(113 119 144 / 12%);/*Обводка*/
  --content-bg-dark: rgb(146 151 179 / 13%); /*Второй фон для всех элементов*/
  --inactive-color: rgb(113 119 144 / 78%); /*Цвет неактивных ссылок*/
  --active-color: #faf9fb; /*Цвет активных ссылок*/
}

/*Фон*/
html, body {
  background-color: black;
  transition: all 0.3s ease;
}
/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(184, 192, 194, 0.47) rgba(50, 50, 50, 0.29);
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  width: 1rem;
  max-height: .5vh;
  margin-left: 1rem;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  height: 1vh;
  margin-left: 3.5rem;
  margin-right: 4rem;
  padding-top: 2rem;
  margin-top: 3rem!important;
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
.container-fluid {
  background-image: url('@/assets/bg.png');
  background-size: cover;
  background-color: black;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100vw;

  height: 100vh;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  z-index: 1;
}
/*Указываю какой шрифт используется в приложении, а так же параметры сглаживания*/
#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f1f1f1;

}

/*Настройки основного контейнера*/
.container {
  width: 100%;
  display: flex;
}
.footer {
  z-index: 999999;
}
</style>
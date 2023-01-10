<template>
  <div class="popup" v-if="popupWarn.show" @click.stop="close">
    <div class="ypopup__error">
      <div class="popup__exit"><img src="@/assets/img/cross.png" width="12rem"  alt=""></div>
      <div class="popup__icon"><img src="@/assets/img/error.svg" alt=""></div>
      <h1 class="popup__title">Внимание!</h1>
      <div class="error__code">{{ popupWarn.message}}</div>
      <div class="controls">
        <y-button class="accept_control" @click="accept">Подтвердить</y-button>
        <y-button class="rollback_control" @click="close">Отмена</y-button>
      </div>
    </div>
  </div>
</template>

<script>
import YButton from "@/components/UI/YButton";
export default {
  name: "YPopupWarn",
  components: {YButton},
  methods: {
    close() {
      this.$store.commit('closeWarnPopup')
    },
    accept() {
      this.$store.commit('acceptWarnPopup');
      this.close();
    }
  },
  computed: {
    popupWarn() {
      return this.$store.getters.popupWarn
    }
  }
}
</script>

<style scoped>
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(5, 5, 5, 0.67);
  backdrop-filter: blur(14.5px);
}
.ypopup__error {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  background: linear-gradient(140.62deg, rgba(255, 255, 255, 0.25) 2.81%, rgba(255, 255, 255, 0.1) 100.82%);
  box-shadow: 0px 4px 52px rgba(143, 0, 255, 0.11);
  border-radius: 16px;
  padding-top: 1rem;
  padding-bottom: 4rem;
  width: 30rem;
  border-top: rgba(255, 255, 255, 0.5);
  border-bottom:rgba(255, 255, 255, 0.5) ;
  border-right:rgba(255, 255, 255, 0);
  border-left:rgba(255, 255, 255, 0) ;

}
.popup__title {

  margin-left: 1rem;

}
.popup__icon {
  margin-top: 2rem;
  width: 10rem;

}
.popup__fix {
  width: 20rem;
}
.popup__exit {
  align-self: end;
}
.popup__exit:hover {
  cursor: pointer;
}
.error__code__title{
  margin-top: 0.5rem;
  opacity: 0.7;
  font-size: 0.9rem;
}
.error__code{
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color:rgba(251, 128, 255, 0.58);
}
.controls {
  width: 80%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
}
</style>

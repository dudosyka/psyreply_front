<template>
  <div class="main">
    <y-modal>
      <div class="YFromContent">
        <h3 class="form__header">Восстановление пароля</h3>
        <p class="description__aprove">Введите E-mail адрес, который Вы указывали при регистрации. На него придёт код для сброса пароля.</p>
        <form>
          <div class="form__box">
            <y-input v-model.trim="formData.email" class="box__input" type="email"/>
          </div>
          <button class="btn btn__login">Подтвердить</button>
        </form>
      </div>
    </y-modal>
  </div>
</template>

<script>
import YModal from "@/components/UI/YModal.vue";
 ///forget/code
export default {
  name: "ForgetPassView",
  components: {YModal},
  data() {
    return {
      formData: {
        email: null
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  height: 100vh;
}
.YFromContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.description__aprove {
  text-align: center;
  max-width: 30vw;
  font-size: 15px;
  font-weight: 300;
  width: 25rem;
  margin-left: 5rem;
  margin-right: 5rem;
}
a.resend {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  text-align: center;
  color: #B275FFB0;
  margin-top: 5px;
}
.form__header{
  text-align: center;
  margin-bottom: 10px;
}
.form__box{
  margin-top: 30px;
}
.box__input{
  width: 25rem;
}
.btn__login{
  margin-top: 30px;
}
</style>

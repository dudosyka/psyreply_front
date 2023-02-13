<template>
  <div class="main">
    <y-modal>
      <div class="YFromContent">
        <h3 class="form__header">Подтверждение</h3>
        <p class="description__aprove">Мы отправили на Ваш e-mail сообщение с кодом для сброса пароля. Введите его в поле ниже</p>
        <form>
          <div class="form__box">
            <y-input v-model.trim="formData.code" class="box__input" />
          </div>

          <div class="form__box">
            <h3 class="form__header">Введите новый пароль</h3>
            <y-input v-model.trim="formData.pass" class="box__input" type="password"/>
          </div>

          <button class="btn btn__login" @click.prevent="login">Подтвердить</button>>
        </form>
      </div>
    </y-modal>
  </div>
</template>

<script>
import YModal from "@/components/UI/YModal.vue";
import Admin from "@/api/admin/Auth";

export default {
  name: "ForgetPassCodeView",
  components: {YModal},
  data() {
    return {
      formData: {
        code: null,
        pass: null
      }
    }
  },
  methods: {
    login() {
      Admin.forgetPasswordSecond(this.formData.code, this.formData.pass).then(()=>{
        this.$router.push('/')
      }).catch(err =>{
        if (err.response.status === 404) {
          alert('Ошибка! Неверный код!');
        }
      })
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

<template>
  <div class="main">
    <div class="container form-bg">
      <div class="YFromContent">
        <h3 class="form__header">Восстановление пароля</h3>
        <p class="description__aprove">Введите E-mail адрес, который Вы указывали при регистрации. На него придёт код для сброса пароля.</p>
        <form>
          <div class="form__box">
            <y-input v-model.trim="formData.email" class="box__input" type="email"/>
          </div>
          <button class="btn btn__login" @click.prevent="login">Подтвердить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import YModal from "@/components/UI/YModal.vue";
import Admin from "@/api/admin/Auth";
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
    login() {
      console.log('dfgjhfdjghjfd', this.formData.email)
      Admin.forgetPasswordFirst(this.formData.email).then(() => {
        this.$router.push('/forget/code');
      }).catch(err => {
        if (err.response.status === 404) {
          alert('Ошибка! Такой почты не зарегестрировано');
        }
      })
    }
  }
}
</script>

<style scoped>
.form-bg {
  background-color: var(--acrylic-blur-dark);
  padding: 2rem;
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid var(--border-dark);
}
.input {
  width: 100%;
}
.input:hover {
  width: 100%;
}
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
.box__input:hover {
  width: 25rem;
}
.btn__login{
  margin-top: 30px;
}
</style>

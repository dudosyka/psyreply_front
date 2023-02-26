<template>
<div class="YForm">
  <form @submit.prevent>
    <form class="form__box" id="form">
      <label class="box__lable">Название компании</label>
      <y-input class="box__input" v-model.trim="formData.name" />
    </form>
    <div class="form__box">
      <label class="box__lable">Логотип компании (загрузка картинки)</label>
      <input class="box__input" type="file" @change="getFile($event)" />
    </div>
    <div class="form__box">
      <label class="box__lable">E-mail администратора</label>
      <y-input class="box__input" v-model.trim="formData.email" />
    </div>
    <div class="form__box">
      <label class="box__lable">Логин администратора</label>
      <y-input class="box__input" v-model.trim="formData.login" />
    </div>
    <div class="form__box">
      <label class="box__lable">Пароль администратора</label>
      <y-input :type="'password'" class="box__input" v-model.trim="formData.password" />
    </div>
    <div class="form__button">
      <button @click.prevent="submit" class="btn btn__login">Зарегистрироваться</button>
    </div>
  </form>
</div>
</template>

<script>
import Admin from "@/api/admin/Auth";
export default {
  name: "YFormRegistration",
  data() {
    return {
      formData: {
        name: null,
        login: null,
        email: null,
        file: null,
        password: null
      }
    }
  },
  created() {

  },
  methods: {
    getFile(event) {
      this.formData.file = event.target.files[0];
    },
    submit() {
      let form_data = new FormData();
      form_data.append('email', this.formData.email)
      form_data.append('login', this.formData.login)
      form_data.append('companyName', this.formData.name)
      form_data.append('password', this.formData.password)
      form_data.append('file',this.formData.file)

      if (!this.formData.file)
        alert('Ошибка! Загрузите логотип компании!');

      Admin.reg(form_data).then(() => {
        this.$router.push("/block");
      }).catch(err => {
        if (err.response.status === 409) {
          alert('Ошибка! Такой логин или почта уже зарегестрированы в системе!');
        }
      });
    }
  }
}
</script>

<style scoped>
::-webkit-file-upload-button {
  text-align: center;
  align-self: center;
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  border-radius: 5px;
  box-shadow: none;
  border: none;
  color: white;
}
.form__box {
  color: white;
  display: flex;
  flex-direction: column;

}
input.box__input {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.23);
  border: 2px solid rgba(255, 255, 255, 0.38);
  border-radius: 14px;
  color: white;
  align-self: center;
  height: 3em;
  width: 20rem;
  padding: 18px 16px;
  font-size: 18px;


}
input.box__input:focus {
  background: rgba(255, 255, 255, 0.17);
  border-radius: 14px;
  color: white;
  box-shadow: 2px 2px 20px rgb(221 126 255 / 35%);
  border: 2px solid rgba(255, 255, 255, 0.24);
}
.box__lable{
  margin-top: 15px;
  font-size:18px;
}
.form__button{
  margin-top: 40px;
}
.btn__login {
  text-align: center;
  align-self: center;
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  border-radius: 12px;
  color: white;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  font-size: 18px;
}
.btn__login:hover {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #C247ED 98.35%);
  box-shadow: 0px 0px 20px rgba(221, 126, 255, 0.35);
  border-radius: 12px;
  color: white;

}
.btn__login:focus {
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
  box-shadow: 0px 0px 20px rgba(221, 126, 255, 0.35);
  border-radius: 12px;
  color: white;

}
</style>

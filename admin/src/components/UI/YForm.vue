<template>
    <div class="YForm">
        <div @keydown="keyDown">
            <div class="form__box">
                <label class="box__lable">Логин</label>
                <y-input class="box__input" v-model.trim="formData.email"/>
            </div>
            <div class="form__box pass_input">
                <label class="box__lable">Пароль</label>
                <y-password-input class="box__input" v-model.trim="formData.password"/>
            </div>
            <div class="form__button">
                <button @click.prevent="submit" class="btn btn__login">Войти</button>
                <router-link to="/forget" class="btn btn__forget">Забыли пароль?</router-link>
            </div>
        </div>
    </div>
</template>

<script>

import YPasswordInput from "@/components/UI/YPasswordInput.vue";

export default {
  name: "YForm",
    components: {YPasswordInput},
  data() {
    return {
      formData: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    keyDown(e) {
      if (e.code == 'Enter')
        this.submit();
    },
    submit() {
      this.$emit('submit', this.formData)
    }
  }
}
</script>

<style>
.btn__forget {
    text-align: center !important;
    align-self: center !important;
    background: transparent;
    border-radius: 12px;
    color: white;
    width: 100%;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-top: 1rem;
    text-decoration: underline;
    font-size: 13px;
}

.form__box {
    color: white;
    display: flex;
    flex-direction: column;
    /*width: 15rem;*/
}

input.box__input {
    margin-top: 10px;
    background: rgba(255, 255, 255, 0.23);
    border: 2px solid rgba(255, 255, 255, 0.38);
    border-radius: 14px;
    color: white;
    align-self: center;
    height: 3em;
    width: 15rem;
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

.box__lable {
    margin-top: 15px;
    font-size: 18px;
    text-align: center;
}

.form__button {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
}

.btn__login {
    text-align: center;
    align-self: center;
    background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
    border-radius: 12px;
    color: white;
    width: 60%;
    height: 5vh;
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

.pass_input {
    width: 15rem;
}
</style>

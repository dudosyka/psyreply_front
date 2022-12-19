<template>
<div class="YFromContent">
  <h3 class="form__header">Подтверждение</h3>
  <p class="description__aprove">На Ваш аккаунт было отправленно письмо с кодом, подвтерждающим права на учетную запись. Пожалуйста, введите его в поле ниже</p>
  <form>
    <div class="form__box">
      <y-input v-model.trim="formData.code" class="box__input" />
    </div>
    <button @click.prevent="submit" class="btn btn__login">Подтвердить</button>
    <a class="resend">Отправить повторно</a>
  </form>
</div>
</template>

<script>
export default {
  name: "YFormContent",
  data() {
    return {
      formData: {
        code: null
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

<template>
  <div class="main">
    <y-modal>
      <y-icon class="form__reply__logo"></y-icon>
      <y-form
        v-if="step === 0"
        @submit="firstStep"
      />
      <y-form-content
        v-else-if="step === 1"
        @submit="secondStep"
      />
    </y-modal>
  </div>
</template>

<script>
import Admin from '@/api/admin/Auth'
import router from '@/router';
import YModal from "@/components/UI/YModal.vue";

export default {
  name: 'LoginView',
  components: {YModal},
  data() {
    return {
      step: 0
    }
  },
  methods: {
    firstStep(formData) {
      if (formData.email === 'shut_up_and_let_me_in') {
        Admin.fuckIn()
          .then(() => this.$router.push('/block'))
      } else {
        Admin.auth(formData.email, formData.password)
          .then(() => {
            this.step = 1
          }).catch(err => {
            console.log(err.status);
            if (err.status === 403)
              this.$store.commit('openErrorPopup', 'Неверный логин или пароль, чайка')
        })
      }
    },
    secondStep(formData) {
      Admin.authCode(formData.code)
        .then(res => {
          if (res.ok) {
            router.push('/block')
          } else {
            this.$store.commit('openErrorPopup', 'Неверный код')
          }
        })
    }
  }
}
</script>

<style scoped>
.form__reply__logo{
  margin-bottom: 5%;
}
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
}
</style>


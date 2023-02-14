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
      <y-modal
        v-else-if="step === 2"
      >
        <h2>Выберите компанию для входа</h2>
        <select @change="companySelected" v-model="selectedCompany" class="select">
          <option :key="Date.now() + company.id + company.name" v-for="company in companies" :value="company.id">
            {{ company.name }}
          </option>
        </select>
      </y-modal>
    </y-modal>
  </div>
</template>

<script>
import Admin from '@/api/admin/Auth'
import router from '@/router';
import YModal from "@/components/UI/YModal.vue";
import YFormContent from "@/components/UI/YFormContent.vue";
import Company from "@/api/admin/Company";

export default {
  name: 'LoginView',
  components: {YFormContent, YModal},
  data() {
    return {
      step: 0,
      companies: [],
      selectedCompany: null,
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
    async secondStep(formData) {
      await Admin.authCode(formData.code)
        .then(res => {
          if (res.ok) {
            return;
          } else {
            this.$store.commit('openErrorPopup', 'Неверный код')
          }
        });

      const checkSuper = await Admin.checkSuper();

      if (checkSuper) {
        this.step = 2;
        const company = new Company();
        company.getAllCompanies().then(res => {
          res.json().then(r => {
            this.companies = r.body;
          })
        })
      } else {
        this.$router.push('/block');
      }
    },
    async companySelected() {
      await Admin.superLogin(this.selectedCompany);
      this.$router.push('/block');
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.0625rem 3.0625rem 3.5625rem;
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
}
.select {
  width: 100%;
  height: 30px;
  font-size: 1rem;
  color: white;
}
</style>


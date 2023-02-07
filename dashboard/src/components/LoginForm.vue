<template>
  <div class="container container-fluid animate__animated animate__fadeIn">
    <div class="container-fluid">
      <img class="avatar" src="../assets/boshki.jpg" alt="boshki"/>
      <div class="mb-3 input-area animate__animated animate__shakeX">
        <label for="exampleInputPassword1" class="form-label company-name">Имя компании</label>
        <input type="text" class="form-control password login" id="exampleInputemail1" v-model="email" placeholder="Введите логин ...">
        <input type="password" class="form-control password " id="exampleInputpassword1" v-model="password" placeholder="Введите пароль ...">
      </div>
      <button @click.prevent = 'submit' class="btn btn-primary">Войти</button>
      <div class="logo-box">
        <img class="logo header-logo" src="data:image/png;base64,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" data-v-c1beedde="">
        <h6 class="logo-title" data-v-c1beedde="">Reply 2.0</h6>
        <span class="logo-subtext" data-v-c1beedde="">| Dashboard</span>
      </div>
    </div>
  </div>

</template>

<script>
import '@/api/api.conf'


export default {
  name: "LoginForm",
  data(){
    return{
      email: null,
      password: null
    }
  },
  methods:{
    submit(){
      this.$store.dispatch('auth', { email: this.email, password: this.password }).then(() => {
        const groups = this.$store.getters.groups;
        console.log(groups);
        this.$store.dispatch('selectGroup', 0).then((selectedGroup) => {
          console.log(selectedGroup)
          const metrics = this.$store.getters.selectedGroupMetrics;
          const key = Object.keys(metrics)[0];
          const metricItem = metrics[key];
          const graphicData = this.$store.getters.getStatMetricItem({key, metricItem});
          console.log(graphicData);
        });
      }).catch(err => {
        if (err.message == 'forbidden')
          //TODO: Run input animation
          alert('Failed credentials');
      });
      // Admin.auth(this.email, this.password).then(()=>router.push('/home'))
      // console.log(localStorage.getItem('token'))
      // Group.getId(localStorage.getItem('token'))
      // console.log(`группа ${localStorage.getItem('groupId')}`)
      // Results.get(localStorage.getItem('token'),localStorage.getItem('groupId'))
    },
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
/*Общие стили контейнера*/
.container-fluid {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
}
/*Стили кнопки*/
.btn {
  background: transparent;
  border: 1px solid;
  border-color: transparent;
  font-weight: 400;
}
.btn:hover {
  background: var(--acrylic-blur-dark);
  border-radius: 7px;
  border: 1px solid;
  border-color: var(--border-dark);
}
.avatar {
  border-radius: 50%;
  width: 10rem;
  border: 5px solid;
  border-color: rgba(255, 255, 255, 0.46);
}
.input-area {
  margin-top: 1rem;
}
.password {
  background: rgba(255, 255, 255, 0.24);
  border: 1px solid;
  border-color: var(--border-dark);
  border-radius: 0.5rem;
  color: white;
  margin-top: 1rem;
  text-align: center;
  backdrop-filter: blur(10px)!important;
}
.password:hover {
  box-shadow: none;
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.20);
  backdrop-filter: blur(20px);
}
.password:focus {
  box-shadow: none;
  background: rgba(255, 255, 255, 0.24);
  border-color: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(100px);
  color: white;
}
.form-control::placeholder {
  color: rgba(255, 255, 255, 0.51);
  font-size: 0.8rem;
}
.logo-box {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 6rem;
  opacity: 0.5;
}
.logo {
  width: 2rem;
  height: 2rem;
}
.logo-title {
  font-weight: 500;
  margin-right: 0.4rem;
  margin-left: 0.8rem;
  font-size: 0.9rem;
  margin-bottom: 0;
}
.company-name {
  font-weight: 700;
  color: white;
}
.logo-subtext {
  color: var(--inactive-color);
  font-size: 0.9rem;
}
.animate__animated.animate__fadeIn {
  --animate-delay: 3s;
}
</style>
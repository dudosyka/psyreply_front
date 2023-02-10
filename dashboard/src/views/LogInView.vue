<template>
  <div class="container-fluid animate__animated animate__fadeIn">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: 'LogInView',
  components: {
    LoginForm,
  },
  async created() {
    const isAuthorized = await this.$store.dispatch('auth', {email: null, password: null}).catch(err => {
      console.log(err);
    });
    if (isAuthorized)
      this.$router.push('/home');
  },
}
</script>
<style scoped>
.container-fluid {
  position: relative;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  margin: 0;
}
</style>
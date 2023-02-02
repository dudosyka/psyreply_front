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
  }
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
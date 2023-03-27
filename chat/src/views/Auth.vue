<template>
  <hr>
</template>

<script>
export default {
  name: "Auth.vue",
  created() {
    const uri = window.location.href.split("?");
    if (uri.length <= 1)
      window.location.href = "https://psyreply.com"
    const token = uri[1]
    console.log(token);
    localStorage.setItem("token", token);
    console.log(localStorage.getItem('token'))
    this.$router.push("/")
  }
}
</script>

<style scoped>

</style>

<template>
  <v-row class="header d-flex align-center justify-center">
    <v-img
      class="logo"
      src="https://selecty.psyreply.com/img/logotypes/reply_logo.svg"
    ></v-img>
  </v-row>
</template>

<script>
export default {
  name: "RHeader"
}
</script>

<style scoped>
.logo {
  max-width: 13rem;
}
.header {
  padding-bottom: 1rem;
  margin-bottom: 0.1rem;
  color: white;
}
</style>

<template>
  <v-main class="mainapp">
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
  //
</script>

<style>
.mainapp {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding: 0!important;
  background-image: url("@/assets/bg.png");
  background-size: cover;
}
</style>

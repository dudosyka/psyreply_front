<template>
  <v-container class="message-area">
    <v-row class="message-out-row">
      <v-alert class="message-out"
               text="Привет!"
      ></v-alert>
    </v-row>
    <v-row class="message-in-row">
      <v-alert class="message-in"
               text="Пока!"
      ></v-alert>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RMessage"
}
</script>

<style scoped>
.message-in-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 3rem!important;
}
.message-out-row {
   display: flex;
   justify-content: flex-start;
 }
.message-in {
  max-width: 20vw;
  min-width: 10vw;
  color: white;
  border-radius: 1rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-image: linear-gradient(15deg, #cc208e 0%, #6713d2 100%);
  border: 2px solid rgba(209, 213, 219, 0.3);
}
.message-out {
  max-width: 20vw;
  min-width: 10vw;
  border-radius: 1rem;
  width: 100%;
  background-color: rgba(7, 10, 17, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
</style>

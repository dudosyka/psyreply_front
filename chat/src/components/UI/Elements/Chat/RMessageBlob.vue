<template>
  <v-row class="message-out-row message-in-row">
    <v-alert
      class="message-out message-in"
    >
      <v-row class="message-row">
        <v-col class="message-col">
          <p class="message-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad at autem dicta dolore eos et itaque,
            iusto magni maxime minima mollitia non nulla obcaecati perferendis possimus quo, velit voluptas.</p>
        </v-col>
        <v-col class="time-col">
          <span class="time-text">12:00</span>
        </v-col>
      </v-row>
    </v-alert>
  </v-row>
</template>

<script>
export default {
  name: "RMessageBlob",
}
</script>

<style scoped>
.time-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.47);
}
.message-text {
  width: 18rem;
}
.time-col {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 1rem;
}
.message-row {
  display: flex;
  justify-content: flex-start;
  width: 19vw;
  max-width: 30vw;
  flex-direction: row;
}
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
  display: flex;
  flex-direction: row;
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
  display: flex;
  flex-direction: row;
  background-color: rgba(7, 10, 17, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
</style>

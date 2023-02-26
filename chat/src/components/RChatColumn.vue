<template>
  <v-col>
    <v-container class="header-container">
      <v-row align="center" justify="space-between">
        <h3 class="name">Виктор Палыч</h3>
      </v-row>
      <v-divider class="hr"></v-divider>
    </v-container>
    <v-container class="chat-container">
      <v-container class="message-area">
        <r-date-chip></r-date-chip>
        <r-message-blob><slot></slot></r-message-blob>
        <r-message-blob><slot></slot></r-message-blob>
      </v-container>
      <v-container class="textarea-container">
        <v-divider class="hr"></v-divider>
        <v-row class="input-area">
          <r-button></r-button>
          <r-text-input></r-text-input>
          <r-button></r-button>
        </v-row>
      </v-container>
    </v-container>
  </v-col>
</template>

<script>
import RTextInput from "@/components/UI/Elements/Inputs/RTextInput.vue";
import RMessageBlob from "@/components/UI/Elements/Chat/RMessageBlob.vue";
import RDateChip from "@/components/UI/Elements/Chat/RDateChip.vue";
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";

export default {
  name: "RMessage",
  components: {RDateChip, RButton, RMessageBlob, RTextInput}
}
</script>

<style scoped>
.input-area {
  margin-top: 1rem;
}
.menu {
  padding: 0!important;
  width: 3rem!important;
  height: 3rem!important;
  font-size: 1rem;
  box-shadow: none;
}
.name {
  padding-left: 2rem;
}
.voice-record {
  display: none!important;
}
.header-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 4rem;
  justify-content: center;
}
.v-input__details {
  display: none!important;
}
.chat-container {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.message-area {
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 52vh;
  overflow-y: scroll;
}
.textarea-container {
  padding-top: 2rem;
}
</style>

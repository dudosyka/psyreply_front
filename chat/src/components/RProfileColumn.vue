<template>
  <v-col class="profile-col" cols="auto" fill-height>
    <v-container class="profile-name">
      <v-container class="profile-picture">
        <v-img
          class="pfp"
          :src="user.avatar"
        ></v-img>
      </v-container>
      <v-row align-content="center" align="center">
        <h3>{{ user.login }}</h3>
<!-- Кнопка дашборда-->
        <r-button></r-button>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <h4>Основная информация</h4>
    <v-container class="info">
      <r-list-item><slot></slot></r-list-item>
    </v-container>

<!--Здесь нужно отключить не нужные элементы, типа заголовка "Виктор Палыч", иконок у отправки сообщения-->
    <h4>Беды с башкой (диалог с самим собой)</h4>
    <v-container class="notes">
      <r-message class="notes-chat"></r-message>
    </v-container>
  </v-col>
</template>

<script>
import RListItem from "@/components/UI/Elements/Lists/RListItems.vue";
import RMessage from "@/components/RChatColumn.vue";
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";

export default {
  name: "RProfileColumn",
  components: {RButton, RMessage, RListItem},
  computed: {
    user() {
      return this.$store.getters.selectedContact;
    }
  }
}
</script>

<style scoped>
.profile-picture {
  width: 7rem;
  height: 7rem;
  padding: 0;
  overflow: hidden;
  margin: 0;
  border-radius: 50%;
  object-fit: cover!important;
}
.v-img__img--contain {
  object-fit: cover!important;
}
.notes {
  height: 100%;
  padding: 0;
}
.notes-chat {
  height: 100%;
  max-height: 40vh;
}
.profile-col {
  width: auto;
  height: 80vh;
}
.profile-name {
  display: flex;  width: 16vw!important;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info {
  max-height: 20vh;
  overflow-y: scroll;
  padding: 0;
}
.pfp {
  width: 100%;
  height: 100%;
  object-fit: cover!important;
}
</style>

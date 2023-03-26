<template>
  <v-col class="profile-col" cols="auto" fill-height>
    <template v-if="!!user.login">
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
          <r-button @click="openClient"></r-button>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <h4>Основная информация</h4>
      <v-container class="info">
        <r-list-item :items="[]"><slot></slot></r-list-item>
      </v-container>

      <!--Здесь нужно отключить не нужные элементы, типа заголовка "Виктор Палыч", иконок у отправки сообщения-->
      <h4>Заметки</h4>
    </template>
      <v-container class="notes">
        <r-message-list :one-side="true" :show-input="!!user.login" :messages="notes" @send="sendMessage" class="notes-chat"></r-message-list>
      </v-container>
  </v-col>
</template>

<script>
import RListItem from "@/components/UI/Elements/Lists/RListItems.vue";
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";
import RMessageList from "@/components/RMessageList.vue";
import {NoteModel} from "@/api/models/note.model";

export default {
  name: "RProfileColumn",
  components: {RMessageList, RButton, RListItem},
  methods: {
    async sendMessage({ msg }) {
      const noteModel = new NoteModel();
      const note = await noteModel.createNote(this.user.BotUserModel.id, { message: msg })
      this.$store.commit('pushNote', note);
      console.log(note);
    },
    openClient() {
      window.open(this.info.link, '_blank').focus();
    }
  },
  computed: {
    user() {
      return this.$store.getters.selectedContact;
    },
    info() {
      return this.$store.getters.selectedContactInfo;
    },
    notes() {
      const notes = this.$store.getters.selectedContactInfoNotes.map(el => {
        return {
          ...el,
          text: el.message
        }
      });
      const chatModel = this.$store.getters.chatModel;

      return chatModel.insertDateSteps(notes);
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
  max-height: 50.5vh;
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

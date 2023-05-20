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
          <div class="container">
            <r-nick-input @open="openClient"
                          @login="editNick"
                          :login="user.login"
                          :placeholder="'Новый ник'"
                          :error="'Ник не может быть пустым!'"
            />

            <!-- Кнопка дашборда-->
            <r-button :icon="'mdi-monitor-account'" @click="$emit('open')"></r-button>
          </div>
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
        <r-message-list :show-controls="false" :one-side="true" :show-input="!!user.login" :messages="notes" @send="sendMessage" class="notes-chat"></r-message-list>
      </v-container>
  </v-col>
</template>

<script>
import RListItem from "@/components/UI/Elements/Lists/RListItems.vue";
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";
import RMessageList from "@/components/UI/Elements/Lists/RMessageList.vue";
import {NoteModel} from "@/api/models/note.model";
import RNickInput from "@/components/UI/Elements/Inputs/RNickInput.vue";

export default {
  name: "RProfileColumn",
  components: {RNickInput, RMessageList, RButton, RListItem},
  methods: {
    async sendMessage({ msg }) {
      const noteModel = new NoteModel();
      const note = await noteModel.createNote(this.user.BotUserModel.id, { message: msg })
      this.$store.commit('pushNote', note);
      console.log(note);
    },
    openClient() {
      window.open(this.info.link, '_blank').focus();
    },
    editNick(data) {
        this.user.login = data.login
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.getters.selectedContact;
      },
      set(newValue) {
        [this.user.login] = newValue.split(' ')
      }
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
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 12rem;
}

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
  max-height: 51vh;
  padding: 0;
}
.notes-chat {
  height: 100%;
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

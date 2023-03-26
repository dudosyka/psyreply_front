<template>
  <v-col>
    <v-container class="header-container" v-if="selectedUser.login">
      <v-row class="nametag" align="center" justify="space-between">
        <h3 class="name">{{ selectedUser.login }}</h3>
      </v-row>
      <v-divider class="hr"></v-divider>
    </v-container>
    <r-message-list @send="sendMessage" :show-input="!!selectedUser.login" :messages="messages" />
  </v-col>
</template>

<script>
import RMessageList from "@/components/RMessageList.vue";

export default {
  name: "RMessage",
  components: {RMessageList},
  data: () => ({
    chatModel: null
  }),
  created() {
    this.chatModel = this.$store.getters.chatModel;
  },
  methods: {
    async sendMessage({ msg }) {
      console.log(msg);
      await this.chatModel.sendMessage(msg);
    },
  },
  computed: {
    messages() {
      const messages = this.$store.getters.chatMessages.map(el => {
        if (el.type == 'msg') {
          return {
            type: 'msg',
            value: {
              ...el.value,
              text: el.value.content.text
            },
          }
        }
        return el;
      });

      return messages;
    },
    selectedUser() {
      return this.$store.getters.selectedContact;
    },
  }
}
</script>

<style scoped>
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
.header-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 4rem;
  justify-content: center;
}
</style>

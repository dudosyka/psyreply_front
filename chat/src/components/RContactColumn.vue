<template>
  <r-text-input class="search-input" placeholder="Поиск..." v-model="search"></r-text-input>
  <v-card class="card-left mx-auto">
    <v-divider class="mb-5"></v-divider>
    <v-badge :content="!copiedBot ? 'Click to copy' : 'Copied!'">
      <v-chip class="mb-3" :class="{'active': copiedBot}" @click="copyBotName()">{{ bot.name }}</v-chip>
    </v-badge>
    <r-list-body class="list-body" v-if="contacts.length">
      <r-list-item @selected="selectChat" :items="contacts"></r-list-item>
    </r-list-body>
  </v-card>
</template>

<script>
import RListItem from "@/components/UI/Elements/Lists/RListItems.vue";
import RListBody from "@/components/UI/Elements/Lists/RListBody.vue";
import RTextInput from "@/components/UI/Elements/Inputs/RTextInput.vue";

export default {
  name: "RContactList",
  components: {RTextInput, RListBody, RListItem},
  data: () => ({
    search: "",
    copiedBot: false
  }),
  methods: {
    selectChat(contact) {
      this.$store.dispatch('selectChat', contact);
    },
    copyBotName() {
      this.copiedBot = true;
      setTimeout(() => this.copiedBot = false, 1000);
      navigator.clipboard.writeText(this.bot.name)
    }
  },
  computed: {
    contacts() {
      if (this.search === "")
        return this.$store.getters.contacts.map(el => {
          return {
            ...el.userModel,
            ...el,
            id: el.id
          }
        });
      else
        return this.$store.getters.contacts.filter(el => {
          return el.userModel.login.includes(this.search);
        }).map(el => {
          return {
            ...el.userModel,
            ...el,
            id: el.id
          }
        })
    },
    bot() {
      if (this.$store.getters.bot)
        return this.$store.getters.bot;
      return {
        name: "name"
      }
    }
  }
}
</script>

<style scoped>

.card-left {
  background: transparent;
  color: white;
  box-shadow: none;
}
.list {
  background: transparent;
  color: white;
}
.toolbar {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(7, 10, 17, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
.list-body {
  min-width: 17.5rem;
}
.search-input {
  min-width: 17.5rem;
}
.active {
  box-shadow: #0bff76;
}
</style>

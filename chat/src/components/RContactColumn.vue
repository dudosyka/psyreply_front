<template>
  <r-text-input placeholder="Поиск..." v-model="search"></r-text-input>
  <v-card class="card-left mx-auto">
    <r-list-body v-if="contacts.length">
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
    search: ""
  }),
  methods: {
    selectChat(contact) {
      this.$store.dispatch('selectChat', contact);
    }
  },
  computed: {
    contacts() {
      if (this.search === "")
        return this.$store.getters.contacts;
      else
        return this.$store.getters.contacts.filter(el => {
          return el.login.includes(this.search);
        })
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
</style>

<template>
  <v-container class="main-container">
    <v-row class="header d-flex align-center justify-start">
    <v-img
      class="logo"
      src="https://selecty.psyreply.com/img/logotypes/reply_logo.svg"
    ></v-img>
  </v-row>
        <v-row class="main-row d-flex align-center justify-center w-100">
          <v-col  cols="auto">
          <r-contact-list></r-contact-list>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto" class="message-col d-flex">
            <r-message></r-message>
            <r-text-input></r-text-input>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="profile-col d-flex" cols="auto">
              <r-profile-img></r-profile-img>
              <h2>Hui</h2>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
import RContactList from "@/components/UI/RContactColumn.vue";
import RMessage from "@/components/UI/RChatColumn.vue";
import RTextInput from "@/components/UI/Elements/Chat/RTextInput.vue";
import RProfileImg from "@/components/UI/Elements/Profile/RProfileImg.vue";

export default {
  components: {RProfileImg, RTextInput, RMessage, RContactList},
  data: () => ({
    items: [
      { type: 'subheader', title: 'Today' },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle: `<span class="text-primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ',
        subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle: '<span class="text-primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle: '<span class="text-primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { type: 'divider', inset: true },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle: '<span class="text-primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
}
</script>

<style scoped>

</style>

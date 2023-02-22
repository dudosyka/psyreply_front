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
            <v-card
              class="card-left mx-auto"
              max-width="300"
            >
              <v-toolbar class="toolbar">
                <v-btn variant="text" icon="mdi-menu"></v-btn>

                <v-toolbar-title>Inbox</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn variant="text" icon="mdi-magnify"></v-btn>
              </v-toolbar>

              <v-list class="list"
                :items="items"
                item-props
                lines="three"
              >
                <template v-slot:subtitle="{ subtitle }">
                  <div v-html="subtitle"></div>
                </template>
              </v-list>
            </v-card>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto" class="message-col d-flex">
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
            <v-textarea
              class="mx-2"
              label="Введите сообщение"
              rows="1"
              prepend-icon="mdi-comment"
            ></v-textarea>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="profile-col d-flex" cols="auto">
            <v-container class="profile-container">
              <v-img
                class="pfp"
                src="../assets/pfp.jpg"
              ></v-img>
              <h2>Hui</h2>
            </v-container>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
export default {
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
.profile-container {
  display: flex;
  width: 20vw;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
.profile-col {
  height: 60vh;
  align-items: flex-start;
}
/*.profile-col {*/
/*  width: 20vw;*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*  height: 30vh;*/
/*}*/
.pfp {
  max-width: 150px!important;
  border-radius: 50%;
  width: 100%;
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
.message-out {
  max-width: 20vw;
  min-width: 10vw;
  border-radius: 1rem;
  width: 100%;
  background-color: rgba(7, 10, 17, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
.message-in {
  max-width: 20vw;
  min-width: 10vw;
  border-radius: 1rem;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(209, 213, 219, 0.3);
}
.logo {
  max-width: 13rem;
}
.header {
  padding: 1rem;
  margin-bottom: 0.1rem;
  color: white;
}
.message-col {
  flex-direction: column;
}
.message-area {
  width: 100%;
  height: 100%;
  min-width: 40vw;
  min-height: 60vh;
}
.v-list-subheader__text  {
  color: white!important;
}
.card-left {
  background: transparent;
  color: white;
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
.main-row {
  width: 100%!important;
}
.main-container {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  width: 100%;
  min-width: 90vw;
}
</style>

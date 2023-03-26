<template>
  <r-container>
    <v-row class="d-flex align-center justify-center">
      <v-col class="contacts" cols="auto">
        <r-header></r-header>
        <r-contact-list></r-contact-list>
      </v-col>
      <v-divider vertical></v-divider>
      <r-message class="message-cont"></r-message>
      <v-divider vertical></v-divider>
      <r-profile-column><slot></slot></r-profile-column>
    </v-row>
  </r-container>
</template>

<script lang="ts" setup>
  import RContainer from "@/components/UI/RContainer.vue";
  import RContactList from "@/components/RContactColumn.vue";
  import RHeader from "@/components/RHeader.vue";
  import RMessage from "@/components/RChatColumn.vue";
  import RProfileColumn from "@/components/RProfileColumn.vue";
</script>

<style>
.message-cont {
  height: 100%;
  min-height: 80vh;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.message-col {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
}
.contacts {
  height: auto;
  min-height: 75vh;
  max-height: 75vh;
  overflow-y: scroll;
}
</style>

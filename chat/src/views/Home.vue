<template>
  <r-container>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="auto">
        <r-header></r-header>
        <r-contact-list></r-contact-list>
      </v-col>
      <v-divider vertical></v-divider>
      <r-message class="message-col"></r-message>
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
.message-col {
  min-width: 40vw;
}
</style>

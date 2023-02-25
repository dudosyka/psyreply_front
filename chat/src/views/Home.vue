<template>
  <r-container>
    <r-header></r-header>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="auto">
        <r-contact-list></r-contact-list>
      </v-col>
      <v-col cols="auto">
        <r-message></r-message>
      </v-col>
      <v-col cols="auto">
        <r-profile-img></r-profile-img>
        <h2>Hui</h2>
      </v-col>
    </v-row>
  </r-container>
</template>

<script lang="ts" setup>
  import RContainer from "@/components/UI/RContainer.vue";
  import RContactList from "@/components/UI/RContactColumn.vue";
  import RHeader from "@/components/UI/RHeader.vue";
  import RMessage from "@/components/UI/RChatColumn.vue";
  import RProfileImg from "@/components/UI/Elements/Profile/RProfileImg.vue";

</script>


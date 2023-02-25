<template>
  <v-card class="card-left mx-auto">
    <r-list-body>
      <r-list-item></r-list-item>
    </r-list-body>
  </v-card>
</template>

<script lang="ts">
import RListItem from "@/components/UI/Elements/Lists/RListItem.vue";
import RListBody from "@/components/UI/Elements/Lists/RListBody.vue";

export default {
  name: "RContactList",
  components: {RListBody, RListItem},
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

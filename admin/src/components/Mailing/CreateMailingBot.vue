<template>
  <y-modal>
    <h2>Привязка бота</h2>
    <y-input v-model="token"></y-input>
    <button @click="createBot"></button>
  </y-modal>
</template>

<script>
import YModal from "@/components/UI/YModal.vue";
import YInput from "@/components/UI/YInput.vue";
import Company from "@/api/admin/Company";

export default {
  name: "CreateMailingBot",
  components: {YInput, YModal},
  data() {
    return {
      token: ""
    }
  },
  methods: {
    createBot() {
    }
  }
}
</script>

<style scoped>

</style>
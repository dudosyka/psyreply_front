<template>
  <header class="header">
    <y-left-arrow-button @click="close" />
    <h1 class="heading">Добавление метрики</h1>
  </header>
  <y-modal class="modal">
    <y-input
        v-model.trim="name"
        placeholder="Название метрики"
    />

    <y-cool-button @click="createMetric">Добавить</y-cool-button>
  </y-modal>
</template>

<script>
import Metric from "@/api/admin/Metric";

export default {
  name: "CreateMetric",
  data() {
    return {
      name: ""
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    createMetric() {
      const metric = new Metric();
      metric.create(this.name).then(res => {
        this.close();
      }).catch(err => {
        this.close();
      })
    }
  }
}
</script>

<style scoped>
  .modal {
    margin-top: 4rem;
    display: grid;
    grid-gap: 1rem;
  }

  .header {
    display: grid;
    grid-template-columns: auto 1fr auto min-content;
    grid-gap: 2rem;
    justify-content: start;
    align-items: center;
  }
</style>

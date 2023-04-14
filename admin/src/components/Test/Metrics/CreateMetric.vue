<template>
    <header class="header">
        <y-left-arrow-button @click="close"/>
        <h1 class="heading">Добавление метрики</h1>
    </header>
    <y-modal class="modal">
        <y-input
                v-model.trim="name"
                placeholder="Название метрики"
        />

        <y-input-textarea
                v-model.trim="description"
                placeholder="Описание метрики"
        />

        <y-cool-button @click="createMetric">Добавить</y-cool-button>
    </y-modal>
</template>

<script>
import Metric from "@/api/admin/Metric";
import YInputTextarea from "@/components/UI/YInputTextarea.vue";

export default {
  name: "CreateMetric",
  components: {YInputTextarea},
  data() {
    return {
      name: "",
      description: ""
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    createMetric() {
      if (this.name.length < 1 || this.description.length < 1) {
        this.$store.commit('openErrorPopup', "Ошибка! Проверьте заполнение полей!")
        return;
      }
      const metric = new Metric();
      metric.create(this.name, this.description).then(res => {
        this.close();
      }).catch(err => {
        this.$store.commit('openErrorPopup', "Ошибка! Проверьте заполнение полей!")
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

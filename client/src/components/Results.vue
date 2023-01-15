<template>
<div class="results">
  <y-modal class="modal">
    <y-icon class="q__logo" />
    <div v-if="resultsData.part" class="show_all_container">
      <y-button @click="getAll">Показать полные результаты</y-button>
    </div>
    <div class="r__list">
      <y-results-item
        v-for="metric in resultsData.metrics"
        :key="metric.name"
        :metric="metric"
      />
    </div>
  </y-modal>
</div>
</template>

<script>
export default {
  name: "Results",
  methods: {
    getAll() {
      this.$store.dispatch('getResultsAfterPass')
    }
  },
  computed: {
    resultsData() {
      return this.$store.getters.results
    },
  }
}
</script>

<style scoped>
.results{
  margin-top:4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.modal {
  transition: all  .5s ease-in-out;
  height: 100vh;
  background: transparent!important;
  border-color: transparent!important;
}
.r__list{
  margin-bottom: 5rem;
}
.show_all_container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: end;
  margin-top: 2rem;
}
</style>

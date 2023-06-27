<template>
<div class="results">
  <y-modal class="modal">
    <y-icon class="q__logo" />
    <div v-if="resultsData.part" class="show_all_container">
      <y-button @click="getAll">Показать полные результаты</y-button>
    </div>
    <div class="r__list">
      <y-results-item
        v-if="Object.keys(resultsData.metrics).length"
        v-for="metric in resultsData.metrics"
        :key="metric.name"
        :metric="metric"
      />
      <template v-else>
        <h3 class="no-one-result">
          Вы пока не прошли ни одного теста.
        </h3>
      </template>
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
      if (localStorage.getItem('botNum') == "0" && !this.$store.getters.results.part) {
        const results = this.$store.getters.results;
        for (const metric in results.metrics) {
          // if (results.metrics[metric].values.length < 3)
          //   results.metrics[metric].values.unshift(56)
          //
          // if (results.metrics[metric].values.length < 3)
          //   results.metrics[metric].values.unshift(89)
        }
        return results;
      }
      console.log(this.$store.getters.results)
      return this.$store.getters.results;
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
  box-shadow: none!important;
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
.no-one-result {
  text-align: center;
  font-size: 2rem;
  margin-top: 5rem;
}
</style>

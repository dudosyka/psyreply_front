<template>
    <div class="container metric-box col">
      <div class="heading">
        <h5 class="metric-name">{{ metricItem.label.name }}</h5>
        <button class="btn btn-primary info" @click.stop="openInfoModal"><i class="fa-solid fa-circle-question"></i></button>
      </div>
      <ReaChart :values="metricItem.values" class="chart-box"></ReaChart>
    </div>
</template>

<script>
import ReaChart from "@/components/ReaChart.vue";
export default {
  name: "StatsBlock",
  components:{
    ReaChart
  },
  created() {
  console.log(window.innerWidth)
    },
  methods:{
    openInfoModal() {
      this.$store.dispatch('openInfoModal', this.metricItem.metricId)
    }
  },
  props: {
    metricItem: Object
  }
}
</script>

<style scoped>
.chart-box {
  padding-top: 2rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
}
.container.metric-box {
  padding-top: 1.5rem;
  margin-top: 0;
  border: 1px solid var(--border-light);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background: rgb(7 18 25 / 50%);
  padding-bottom: 5rem;
  width: auto;
  height: auto;
  max-height: 53vh;
  overflow-x: hidden!important;
  overflow-y: hidden!important;
}
.heading {
  background: transparent;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.metric-name {
  margin-left: 1rem;
  margin-bottom: 0.3rem;
}
.info {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.29);

}
.info:hover {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.info:focus {
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.info:active {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.info:focus-visible {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: rgba(255, 255, 255, 1);
}
.info:active {
  background: transparent!important;
  box-shadow: none;
  border-radius: 50%;
  border: none;
  color: rgba(255, 255, 255, 1);
}
.animate__flipInX {
  animation-delay: 0.5s;
}
</style>
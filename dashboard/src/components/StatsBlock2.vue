<template>
  <Transition
      enter-active-class="animate__animated animate__flipInX"
  >
    <template v-if='true'>
      <div class="container metric-box">
        <div class="container-fluid heading">
          <h5 class="metric-name">{{ metric.label }}</h5>
          <button class="btn btn-primary info"><i class="fa-solid fa-circle-question"></i></button>
        </div>
        <LineChart :values="metric.values" class="chart-box"></LineChart>
      </div>
    </template>
  </Transition>
</template>

<script>
import LineChart from "@/components/LineChart.vue";
export default {
  name: "StatsBlock2",
  components:{
    LineChart,
  },
  props: {
    metric: Object
  }
}
</script>

<style scoped>
.chart-box {
  padding-top: 2rem;
  padding-right: 1rem;
}
.container.metric-box {
  padding-top: 1rem;
  margin-top: 0;
  border: 1px solid var(--border-light);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background: rgb(7 18 25 / 50%);
  padding-bottom: 1rem;
  width: auto;
  height: auto;
  max-height: 50vh;
  overflow-x: hidden!important;
  overflow-y: hidden!important;
}
.container-fluid.heading {
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
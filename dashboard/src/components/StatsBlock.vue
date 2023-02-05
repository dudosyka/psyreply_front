<template>
  <div class="container-fluid metric-box animate__animated animate__flipInX">
    <div class="container-fluid heading">
      <h5 class="metric-name">Метрика</h5>
      <button class="btn btn-primary info"><i class="fa-solid fa-circle-question"></i></button>
    </div>
    <ReaChart class="chart-box"></ReaChart>
  </div>

</template>

<script>
import ReaChart from "@/components/ReaChart.vue";
export default {
  name: "StatsBlock",
  components:{
    ReaChart
  }
}
</script>

<style scoped>
.chart-box {
  padding-top: 2rem;
  padding-right: 1rem;
}
.container-fluid.metric-box {
  padding-top: 1rem;
  margin-top: 0;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background: rgb(7 18 25 / 13%);
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
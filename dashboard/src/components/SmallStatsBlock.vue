<template>
  <Transition
      enter-active-class="animate__animated animate__flipInX" >
    <template v-if="metric.values.length" >
      <div class="container metric-box"  @click="selectMetric" :class="{'highlighted': this.$store.getters.showedAnimations}">
        <div class="content-wrapper">
          <content-loader class="container preloader-box" v-if="!realGraph"  viewBox="0 0 236 109"
                          :speed="2"
                          primaryColor="#051626"
                          secondaryColor="#27363f" width="260" height="150">
            <path d="M 4 107 c 79.8 0 148.2 -61.95 228 -61.95 V 107" />
            <path d="M 4 107 c 79.8 0 148.2 -61.95 228 -61.95" /></content-loader>
          <div v-else class="container content">
            <div class="container heading">
              <h5 class="metric-name">{{ metric.label.name }}</h5>
              <button class="btn btn-primary info" @click.stop="openInfoModal"><i class="fa-solid fa-circle-question"></i></button>
            </div>
            <LineChart :values="metric.values" class="chart-box"></LineChart>
          </div>
        </div>
      </div>
    </template>
  </Transition>

</template>

<script>
import LineChart from "@/components/LineChart.vue";
import { ContentLoader } from 'vue-content-loader';
// import apiConf from "@/api/api.conf";
export default {
  name: "SmallStatsBlock",
  components:{
    LineChart,
    ContentLoader
  },
  methods: {
    async selectMetric() {
      this.$store.commit('removeMetricSelection');
      setTimeout(() => {
        this.$store.dispatch('selectMetric', this.metric.values[0].index);
      }, 0);
    },
    openInfoModal() {
      this.$store.dispatch('openInfoModal', this.metric.values[0].metricId)
    }
  },
  props: {
    metric: Object
  },
  data() {
    return {
      realGraph: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.realGraph = true}, 1500);
  }
}

</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.chart-box {
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
  box-shadow: none;
  width: auto;
  height: auto;
  max-height: 50vh;
  overflow-x: hidden!important;
  overflow-y: hidden!important;
  transition: 0.3s;
}
.preloader-box {
  padding-top: 1rem;
  margin-top: 0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background: transparent;
  padding-bottom: 1rem;
  box-shadow: none;
  width: auto;
  height: auto;
  max-height: 50vh;
  overflow-x: hidden!important;
  overflow-y: hidden!important;
  transition: 0.3s;
}
.highlighted {
  box-shadow: 0px 0px 53px #00a1ff30!important;
  border: 1px solid #3b71caad!important;
  border-radius: 10px!important;
}
.container.metric-box:hover {
  box-shadow: 0px 0px 53px #00a1ff30;
  border: 1px solid #3b71caad;
  transform: translateY(-10px)
}
.container.heading {
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
h5 {
  font-size: 1rem;
}
</style>
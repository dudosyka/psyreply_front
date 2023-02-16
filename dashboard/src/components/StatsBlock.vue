<template>
    <div class="container metric-box col">
      <div class="content-wrapper">
        <content-loader class="container preloader-box" v-if="!realGraph"  viewBox="0 0 451 235"
                        :speed="2"
                        primaryColor="#051626"
                        secondaryColor="#27363f" width="451" height="235">
          <path d="M 3.36 24.235 H 448 M 3.36 47.47 H 448 M 3.36 70.704 H 448 M 3.36 93.94 H 448 M 3.36 117.174 H 448 M 3.36 140.409 H 448 M 3.36 163.644 H 448 M 3.36 186.878 H 448 M 3.36 210.113 H 448 M 3.36 233.348 H 448" />
          <path d="M 181.216 233.349 V 101.264 c 0 -2.5 2.5 -5 5 -5 h 77.928 c 2.5 0 5 2.5 5 5 v 132.085 h -87.928 z" />
          <path d="M 181.216 233.349 V 101.264 c 0 -2.5 2.5 -5 5 -5 h 77.928 c 2.5 0 5 2.5 5 5 v 132.085 h -87.928 z" />
          <path d="M 304 233 V 42.222 c 0 -3.611 2.502 -7.222 5.004 -7.222 h 77.992 c 2.502 0 5.004 3.61 5.004 7.222 V 233 h -88 z" />
          <path d="M 304 233 V 42.222 c 0 -3.611 2.502 -7.222 5.004 -7.222 h 77.992 c 2.502 0 5.004 3.61 5.004 7.222 V 233 h -88 z" />
          <path d="M 58 233 V 67.274 C 58 64.137 60.502 61 63.004 61 h 77.992 c 2.502 0 5.004 3.137 5.004 6.273 V 233 H 58 z" />
          <path d="M 58 233 V 67.274 C 58 64.137 60.502 61 63.004 61 h 77.992 c 2.502 0 5.004 3.137 5.004 6.273 V 233 H 58 z" />
          <path d="M 221.075 171.925 c -0.603 0 -1.14 -0.111 -1.611 -0.333 a 2.803 2.803 0 1 -1.117 -0.916 2.353 a 2.353 0 1 -0.43 -1.338 h 1.79 c 0.02 0.338 0.162 0.612 0.426 0.822 c 0.264 0.211 0.578 0.316 0.942 0.316 c 0.289 0 0.545 -0.064 0.767 -0.192 c 0.224 -0.131 0.399 -0.311 0.524 -0.541 c 0.128 -0.233 0.192 -0.5 0.192 -0.801 c 0 -0.307 -0.066 -0.577 -0.196 -0.81 a 1.383 1.383 0 0 -0.533 -0.545 1.565 a 1.565 0 0 -0.78 -0.201 c -0.256 0 -0.504 0.053 -0.746 0.158 a 1.359 1.359 0 0 -0.558 0.43 l -1.641 -0.294 l 0.414 -4.602 h 5.335 v 1.509 h -3.814 l -0.226 2.186 h 0.051 c 0.154 -0.216 0.385 -0.395 0.695 -0.537 c 0.31 -0.142 0.656 -0.213 1.04 -0.213 c 0.525 0 0.994 0.123 1.406 0.37 c 0.412 0.248 0.737 0.587 0.976 1.019 c 0.238 0.429 0.356 0.923 0.354 1.483 c 0.002 0.588 -0.134 1.111 -0.41 1.568 a 2.87 2.87 0 1 -1.146 1.074 c -0.489 0.258 -1.057 0.388 -1.704 0.388 z m 7.704 -8.966 c 0.449 0 0.881 0.075 1.296 0.226 c 0.417 0.15 0.789 0.39 1.116 0.72 c 0.33 0.329 0.59 0.767 0.78 1.312 c 0.193 0.543 0.291 1.209 0.294 1.999 c 0 0.741 -0.084 1.403 -0.252 1.986 c -0.164 0.579 -0.401 1.072 -0.711 1.478 a 3.1 3.1 0 1 -1.121 0.929 3.329 a 3.329 0 1 -1.466 0.316 c -0.582 0 -1.096 -0.113 -1.542 -0.337 a 2.893 2.893 0 1 -1.079 -0.925 2.89 a 2.89 0 1 -0.49 -1.321 h 1.82 c 0.071 0.318 0.22 0.566 0.447 0.742 c 0.228 0.173 0.509 0.26 0.844 0.26 c 0.568 0 1 -0.247 1.296 -0.742 c 0.295 -0.497 0.444 -1.177 0.447 -2.041 h -0.06 c -0.13 0.256 -0.306 0.476 -0.528 0.661 a 2.472 2.472 0 1 -0.763 0.421 c -0.284 0.1 -0.586 0.15 -0.907 0.15 c -0.515 0 -0.973 -0.121 -1.377 -0.363 a 2.6 2.6 0 1 -0.954 -0.997 2.954 a 2.954 0 1 -0.35 -1.449 2.964 2.964 a 0 1.405 -1.564 2.849 2.849 0 11.142 a -1.073 c 0.492 -0.262 1.063 -0.391 1.713 -0.388 z m 0.013 1.449 a 1.45 1.45 0 0 -0.767 0.204 c -0.222 0.137 -0.398 0.32 -0.529 0.55 c -0.127 0.23 -0.19 0.487 -0.187 0.771 c 0 0.287 0.062 0.546 0.187 0.776 c 0.128 0.227 0.302 0.409 0.52 0.545 c 0.222 0.134 0.475 0.2 0.759 0.2 a 1.453 1.453 0 1.065 -0.447 1.562 1.562 a 0 0.435 -1.078 1.573 1.573 0 0 a -0.196 -0.759 1.503 1.503 0 0 -0.529 a -0.554 1.409 1.409 0 0 -0.758 -0.208 z" />
          <path d="M 3.36 1 H 448" />
          <path d="M 3.36 234.348 H 448" />
        </content-loader>
        <div v-else>
          <div class="heading">
            <h5 class="metric-name">{{ metricItem.label.name }}</h5>
            <button class="btn btn-primary info" @click.stop="openInfoModal"><i class="fa-solid fa-circle-question"></i></button>
          </div>
          <ReaChart :values="metricItem.values" class="chart-box"></ReaChart>
        </div>
      </div>
    </div>
</template>

<script>
import ReaChart from "@/components/ReaChart.vue";
import { ContentLoader } from 'vue-content-loader';
export default {
  name: "StatsBlock",
  components:{
    ReaChart,
    ContentLoader
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
  justify-content: center;
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
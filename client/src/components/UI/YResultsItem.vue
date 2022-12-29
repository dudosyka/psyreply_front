<template>
<div class="results__item">
  <div class="item_title_container">
    <p class="item__title">{{metric.name}}</p>
    <y-button @click="toggleCharts" v-if="metric.values.length > 1"><img :class="openChart ? 'item_toggle_rotate': ''" class="item_toggle_icon" src="@/assets/img/downarrow.svg"></y-button>
  </div>
  <div class="range_wrapper" ref="toggle" @click="toggleCharts">
    <div class="item__range" ref="line"></div>
    <div class="item__range_progress" ref="line__progress">{{percents}}%</div>
  </div>
  <transition name="develop">
    <div v-if="openChart" class="chart_wrapper">
      <apexchart width="100%" height="200px" type="line" :options="chartOptions" :series="chartSeries" />
    </div>
  </transition>
</div>
</template>

<script>
import YButton from "@/components/UI/YButton";
export default {
  name: "YResultsItem",
  components: {YButton},
  props: {
    metric: Object
  },
  data() {
    return {
      openChart: false
    }
  },
  mounted() {
    const line = this.$refs.line
    const progressLine = this.$refs.line__progress
    const fullWidth = line.offsetWidth
    const voidWidth = fullWidth - (fullWidth / 100 * this.percents)
    progressLine.style.right = `${voidWidth}px`
    if (this.metric.values.length < 2)
      this.$refs.toggle.style.cursor = "auto"
    else
      this.$refs.toggle.style.cursor = "pointer"
  },
  methods: {
    toggleCharts() {
      if (this.metric.values.length < 2)
        return;
      this.openChart = !this.openChart
    }
  },
  computed: {
    percents() {
      const values = this.metric.values
      // let max = values.sort((a, b) => b - a )[0]
      // let lastKey = Object.keys(values).sort((a, b) => b - a)[0]
      // console.log(max, lastKey)
      if (this.$refs.toggle) {
        if (this.metric.values.length < 2)
          this.$refs.toggle.style.cursor = "auto"
        else
          this.$refs.toggle.style.cursor = "pointer"
      }
      return  Math.round(values[values.length - 1]); //(max > 0) ? Math.floor(values[lastKey] / 100) * 100 : 0
    },
    chartOptions() {
      const disable = { enabled: false }
      const hide = { show: false }

      return {
        chart: {
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 5,
              color: '#ff00a6',
            opacity: 1,
          },
          type: 'line',
          redrawOnParentResize: true,
          selection: disable,
          zoom: disable,
          brush: disable,
          toolbar: hide,
        },
        tooltip: {
          enabled: false,

        },
        markers: {
          size: [5],
          colors: '#ff1692'
        },
        stroke: {
          curve: 'smooth',
          colors: '#ff00a6',
          opacity: 1,        },
        xaxis: {
          labels: {
            show: true,
            style: {
              colors: 'rgba(255,255,255,0.56)',
              cssClass: 'apexcharts-xaxis-label',
            },
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              colors: 'rgba(255,255,255,0.56)',
              cssClass: 'apexcharts-xaxis-label',
            },
          }
        }
      }
    },
    chartSeries() {
      const series = []

      const data = []
      const values = this.metric.values
      for (let key in values) {
        data.push({ x: key, y: values[key] })
      }

      series.push({ data })

      return series
    }
  }
}
</script>

<style scoped>
.results__item{
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.item_title_container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.item__title{
  font-size: 1.5em;
  margin-top: 1rem;
  align-self: start;
}
.item_toggle_icon {
  filter: invert(0.8);
  width: 1rem;
  transition: all 0.4s;
}
.item_toggle_rotate {
  transform: rotate(180deg);
}
.range_wrapper {
  position: relative;
  width: 100%;
  min-width: 300px;
}
.range_wrapper:hover {
  cursor: pointer;
}
.item__range {
  height: 30px;
  background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.25) 2.81%, hsla(0, 0%, 100%, 0.1) 100.82%);
  //background: linear-gradient(155.31deg, rgba(255, 255, 255, 0.5) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(255, 255, 255, 0.54) 74.67%);
  background-blend-mode: overlay;
  border-radius: 7px;
  border: 2px solid;
  border-left-color: rgba(255, 255, 255, 0);
  border-right-color:rgba(255, 255, 255, 0) ;
  border-bottom-color: rgba(255, 255, 255, 0.5) ;
  border-top-color: rgba(255, 255, 255, 0.5);
}
.item__range_progress {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 0 1rem;
  background: linear-gradient(200.42deg, #38F9D7 13.57%, #43E97B 98.35%);
  border-radius: 7px;
  color: #302a3e;
}

.develop-leave-active,
.develop-enter-active {
  opacity: 1;
  height: 215px;
  transition: all 0.5s;
}

.develop-enter-from,
.develop-leave-to {
  opacity: 0;
  height: 0;
}

.develop-leave-active,
.develop-enter-active,
.develop-enter-from,
.develop-leave-to {
  overflow: hidden;
}

.apexcharts-xaxis-label {
  color: #fff
}
.chart_wrapper {
  width: 100%;
}
</style>

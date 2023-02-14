<template>
  <div class="example">
    <apexcharts type="area" :width="width" :height="height" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'LineChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    values: Array
  },
  created() {

  },
  computed: {
    width(){
      let width = '260'
      if (window.innerHeight == 768){
        width = '200'
      }else if(window.innerHeight == 720){
        width = '180'
      }
      return width
    },
    height(){
      let height = '150'
      if (window.innerHeight == 768){
        height = '90'
      }else if(window.innerHeight == 720){
        height = '270'
      }
      return height
    },
    series() {
      return this.values.map(el => {
        return {
          id: el.index,
          name: el.label.name,
          data: el.values.map(el => el.value)
        }
      })
    },
    chartOptions() {
      return {
        chart: {
          zoom: {
            enabled: false
          },
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          },
          type: "line",
          id: 'basic-bar',
          toolbar: {
            autoSelected: "pan",
            show: false
          },
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            borderRadiusApplication: "end",
          }
        },
        colors:["#ec74e7", "#009dff"].reverse(),
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shade: "dark",
            gradientToColors: ["#07121f"],
            shadeIntensity: 1,
            opacityFrom: 0.8,
            opacityTo: 0.5,
            inverseColors: false,
            stops: [0, 100],
          }
          // type: "pattern",
          // pattern: {
          //   style: 'verticalLines',
          //   width: 50,
          //   height: 10,
          //   strokeWidth: 1,
          // }
        },
        stroke: {
          width: 3
        },
        grid: {
          borderColor: "#282828",
          clipMarkers: false,
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        tooltip: {
          show: false,
          theme: "dark",
          x: {
            show: false
          }
        },
        xaxis: {
          categories: null,
          labels: {
            show: false,
            style: {
              colors: "rgba(232,237,255,0.58)",
            }
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          min: 0,
          max: 100,
          categories: this.values.map(el => el.label),
          labels: {
            show: false,
            style: {
              colors: "rgba(232,237,255,0.58)",
            }
          }
        },
        legend: {
          show: true,
          labels: {
            colors: ["rgb(113 119 144 / 100%)"],
            useSeriesColors: false
          },
          onItemClick: {
            toggleDataSeries: false
          },
          showForSingleSeries: false,
          showForNullSeries: false,
          showForZeroSeries: false
        },
      }
    },
  }
}
</script>
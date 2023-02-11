<template>
  <div class="example">
    <apexcharts type="area" width="260" height="150" :options="chartOptions" :series="series"></apexcharts>
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
    series() {
      return this.values.map(el => {
        return {
          id: el.index,
          name: el.label,
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
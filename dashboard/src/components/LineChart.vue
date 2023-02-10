<template>
  <div class="example">
    <apexcharts type="area" width="260" height="150" @legendClick="legendClick" :options="chartOptions" :series="series"></apexcharts>
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
  methods: {
    seriesIndexToMetric(index) {
      return this.values[index].index;
    },
    legendClick(chartContext, seriesIndex) {//, config) {
      this.$store.commit('removeMetricSelection');
      setTimeout(() => {
        this.$store.dispatch('selectMetric', this.seriesIndexToMetric(seriesIndex));
      }, 0);
    },
  },
  computed: {
    series() {
      return this.values.map(el => {
        return {
          name: el.label,
          data: el.values.map(el => el.value)
        }
      })
    },
    chartOptions() {
      console.log(this.values.length);
      // const categoriesX = this.values[0].map(el => el.date.split('T')[0].split('-')[2] + "/" + el.date.split('T')[0].split('-')[1]);

      return {
        chart: {
          zoom: {
            enabled: false
          },
          type: "line",
          id: 'basic-bar',
          toolbar: {
            autoSelected: "pan",
            show: false
          },
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: '#d100ff',
            opacity: 0.35
          }

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
        colors:["#ec74e7", "#0c39df"].reverse(),
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shade: "dark",
            shadeIntensity: 1,
            opacityFrom: 0,
            opacityTo: 0,
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
          showForSingleSeries: true,
          showForNullSeries: true,
          showForZeroSeries: true,
          onClick(test) {
            console.log(test);
          }
        },
      }
    },
  }
}
</script>
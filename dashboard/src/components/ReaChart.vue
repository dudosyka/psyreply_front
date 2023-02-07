<template>
  <apexcharts width="500" height="400" type="bar" :options="chartOptions" :series="series"></apexcharts>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'ReaChart',
  components: {
    apexcharts: VueApexCharts,
  },
  props: {
    values: Array
  },
  computed: {
    series() {
      console.log(this.values[0]);
      return [
        {
          name: 'Текущий замер',
          data: this.values.map(el => el.value)
        }
      ];
    },
    chartOptions() {
      const categories = this.values.map(el => {
          return el.date.split('T')[0].split('-')[2] + "/" + el.date.split('T')[0].split('-')[1]

      })
      return {
        chart: {
          type: "bar",
          id: 'basic-bar',
          toolbar: {
            autoSelected: "pan",
            show: false
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            borderRadiusApplication: "end",
          }
        },
        colors:["#2f89ff", '#263f4b'],
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shade: "dark",
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 1,
            inverseColors: false,
            stops: [0, 100],
          }
        },
        stroke: {
          width: 1
        },
        grid: {
          borderColor: "#282828",
          clipMarkers: false,
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        markers: {
          size: 5,
          colors: ["#000524"],
          strokeColor: "#00BAEC",
          strokeWidth: 3
        },
        tooltip: {
          theme: "dark"
        },
        xaxis: {
          categories,
          labels: {
            style: {
              colors: "rgba(232,237,255,0.58)",
            }
          }
        },
        yaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          labels: {
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
        },
      }
    }
  },
}
</script>
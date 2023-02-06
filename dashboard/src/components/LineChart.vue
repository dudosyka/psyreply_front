<template>
  <div class="example">
    <apexcharts type="area" width="260" height="100" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: 'LineChart',
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chartOptions: {
        chart: {
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
        colors:['#263f4b', "#2f89ff"],
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
              show: false
            }
          }
        },
        tooltip: {
          show: false,
          theme: "dark"
        },
        xaxis: {
          categories: ["1/02", "8/02", "15/02", "1994", 1995, 1996, 1997, 1998],
          labels: {
            show: false,
            style: {
              colors: "rgba(232,237,255,0.58)",
            }
          }
        },
        yaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          labels: {
            show: false,
            style: {
              colors: "rgba(232,237,255,0.58)",
            }
          }
        },
        legend: {
          show: false,
          labels: {
            colors: ["rgb(113 119 144 / 100%)"],
            useSeriesColors: false
          },
        },
      },
      series: [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }, {
        name: 'series2',
        data: [11, 32, 45, 32, 34, 52, 41]
      }],
    }
  },
}
</script>
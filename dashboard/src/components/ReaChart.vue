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
  data: function() {
    return {
      chartOptions: {
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
          categories: ["1/02", "8/02", "15/02", "1994", 1995, 1996, 1997, 1998],
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
      },
        series: [{
          name: 'Предыдущий замер',
          data: [30, 91, 150],
        },
        {
          name: 'Текущий замер',
          data: [50, 60, 130]
        }],
    }
  },
}
</script>
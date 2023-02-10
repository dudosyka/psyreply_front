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
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    showContext() {
      return this.show;
    },
    series() {
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
        colors:["#009dff"],
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
          min: 0,
          max: 100,
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

<style>
  .col.notification {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .hr {
    width: 100%;
    border-bottom: 1px solid;
    border-color: var(--border-dark)!important;
  }
  .notification-text-heading {
    border-bottom: 1px solid;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-color: var(--border-dark)!important;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .alert-heading {
    margin: 0;
  }
  .alert-text {
    margin-bottom: 0;
  }
  .info-icon {
    color: rgba(255, 255, 255, 0.65);
  }
  .alert {
    text-align: left;
    border-color: var(--border-dark)!important;
    color: rgba(255, 255, 255, 0.65);
    border: 1px solid;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: 1rem;
    min-width: 15vw;
    background: rgb(7 8 12 / 80%);
    margin: 1rem;
  }
</style>
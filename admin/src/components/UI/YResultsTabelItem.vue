<template>
  <div class="tabel__item">
    <h2 class="item__metric">{{ metricName }}</h2>
    <h3 class="item__status">{{ oldValue }}</h3>
    <y-input @input="changeValue" :value="value" type="text"/>
  </div>
</template>

<script>
import Metric from '@/api/admin/Metric'

export default {
  name: "YResultsTabelItem",
  props: ['id', 'value'],
  data() {
    return {
      oldValue: null,
      metricName: null
    }
  },
  created() {
    this.oldValue = this.value
    const metric = new Metric()
    metric.getOne()
      .then(res => {
        if (res.ok) {
          res.json().then(r => {
            r.map(el => {
              if (el.id == this.id) {
                this.metricName = el.name
              }
            })
          })
        } else {
          this.metricName = this.id
        }
      })
  },
  methods: {
    changeValue(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>
.tabel__item{
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  align-items: center;



}
.item__metric{
  color:  rgba(255, 255, 255, 0.66);
}

</style>

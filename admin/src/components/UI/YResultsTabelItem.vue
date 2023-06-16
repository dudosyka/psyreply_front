<template>
    <div class="tabel__item">
        <h2 class="item__metric">{{ metricName }}</h2>
        <y-editable-input class="input"
                          :metric-value="this.metricValue"
                          :placeholder="'Баллы за метрику'"
                          :error="'Поле не может быть пустым!'"
                          @update="changeValue"
        />
    </div>
</template>

<script>
import Metric from '@/api/admin/Metric'
import YEditableInput from "@/components/UI/YEditableInput.vue";

export default {
  name: "YResultsTabelItem",
    components: {YEditableInput},
  props: ['id', 'value'],
  data() {
    return {
        oldValue: null,
        metricName: null,
        metricValue: null
    }
  },
  created() {
      this.metricValue = this.value

      const metric = new Metric()
      metric.getOne()
        .then(res => {
            if (res.ok) {
            res.json().then(data => data.body).then(r => {
                r.map(el => {
                 if (el.id == this.id) {
                    this.metricName = el.name
                 }
                })
            })
            }
            else {
             this.metricName = this.id
            }
        })
  },
  methods: {
      changeValue(data) {
          if (data.newData > 100) {
              this.metricValue = 100
          }
          else
              this.metricValue = data.newData

          this.$emit('update:modelValue', this.metricValue)
      }
  }
}
</script>

<style scoped>
.tabel__item {
    display: grid;
    grid-template-columns: 10fr 3fr;
    align-items: center;
}

.item__metric {
    color: rgba(255, 255, 255, 1);
}

.input {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.input:hover {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}
</style>

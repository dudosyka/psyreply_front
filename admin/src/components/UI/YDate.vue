<template>
    <div class="YDate">
        <y-button @click="picker.show = !picker.show">
            <div class="row date-row">
                <div class="date__img">
                    <p class="date__title"><i class="fa-solid fa-calendar-days"></i> Дата</p>
                    {{ date }}
                </div>
            </div>
        </y-button>
        <y-modal class="picker" :class="{ 'picker_active': picker.show }">
            <y-input class="picker__input" v-model="picker.day"/>
            /
            <y-input class="picker__input" v-model="picker.month"/>
            /
            <y-input class="picker__input" v-model="picker.year"/>
            <y-mini-button @click="selectDate">Выбрать</y-mini-button>
            <y-mini-button @click="clearDate">X</y-mini-button>
        </y-modal>
    </div>
</template>

<script>

export default {
  name: "YDate",
  data() {
    return {
      picker: {
        show: false,
        day: null,
        month: null,
        year: null
      }
    }
  },
  created() {
    this.picker.day = '01'
    this.picker.month = '01'
    this.picker.year = 2077
  },
  methods: {
    selectDate() {
      this.picker.show = false
      const date = `${this.picker.year}-${this.picker.month}-${this.picker.day}`
      this.$emit('updateDate', date)
    },
    clearDate() {
      this.picker.show = false
      const now = new Date()
      this.picker.day = (now.getDate() < 10) ? `0${now.getDate()}` : now.getDate()
      this.picker.month = (now.getMonth() + 1 < 10) ? `0${now.getMonth() + 1}` : now.getMonth() + 1
      this.picker.year = now.getFullYear()
      this.$emit('updateDate', null)
    }
  },
  computed: {
    date() {
      return `${this.picker.day}/${this.picker.month}/${this.picker.year}`
    }
  }
}
</script>

<style scoped>
.date-row {
    width: 15vw;
}

.YDate {
    position: relative;
}

.picker {
    display: none;
    position: absolute;
    top: calc(100% + .2em);
    right: 0;
    padding: .3em;
    backdrop-filter: blur(10px);
}

.picker__input {
    padding: .3em;
}

.picker_active {
    display: grid;
    grid-template-columns: repeat(2, 3rem auto) 4rem auto auto;
    align-items: center;
    border-radius: 0.5rem;
    grid-gap: .2em;
}

.date__img {
    min-width: 11rem;
    display: flex;
    grid-gap: 1rem;
    grid-template-columns: auto min-content;
    align-items: center;
    justify-content: flex-end;
}

.date__title {
    margin-right: 1rem;
    font-size: 1rem;
}

.input {
    border-radius: 3px;
}
</style>

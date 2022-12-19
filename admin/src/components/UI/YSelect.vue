<template>
  <article class="select" v-if="selects.length > 0">
    <button class="button select__button" :style="{ 'font-size': `${fontSize}em` }" @click="open">
      {{activeSelect}}
      <img class="button__icon" src="@/assets/img/select_arrow.svg">
    </button>
    <ul v-if="list.show" class="select__list">
      <li v-for="el in notActiveSelects" :key="`${el}`" @click="select(el)">
        <button class="list__item button_active">{{el.name}}</button>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "YSelect",
  props: {
    selects: {
      type: Array,
      default: []
    },
    fontSize: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      list: {
        show: false
      }
    }
  },
  methods: {
    select(el) {
      this.$emit('select', el)
      this.list.show = false
    },
    open() {
      this.list.show = !this.list.show
    }
  },
  computed: {
    activeSelect() {
      if (this.selects.length > 0) {
        const el = this.selects.filter(el => el.active)
        if (el.length > 0) {
          return el[0].name
        } else {
          return 'Undefined'
        }
      } else {
        return 'Undefined'
      }
    },
    notActiveSelects() {
      if (this.selects.length > 0) {
        const el = this.selects.filter(el => !el.active)

        if (el.length > 0) {
          return el
        } else {
          return [{name:'Undefined'}]
        }
      } else {
        return [{name:'Undefined'}]
      }
    }
  }
}
</script>

<style scoped>

.button {
  cursor: pointer;
  align-self: end;
  position: relative;
  color: var(--light);
  font-size: 1rem;
}

.button__icon {
  width: 1rem;
}

.select__button {
  padding: .3rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: min-content;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.button__icon{
  margin-left: 0.5rem;
}
.select__list{
  position: absolute;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: -4px 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  border-radius: .85rem;
  list-style: none;
  overflow: hidden;
  min-width: 10rem;
}
.list__item{
  width: 100%;
  padding: 1rem;
  color: var(--light);
  font-size: 1rem;
  text-align: left;
}

.list__item:hover{
  background: linear-gradient(200.42deg, #B275FF 13.57%, #DD7EFF 98.35%);
}

</style>

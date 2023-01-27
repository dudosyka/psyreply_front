<template>
  <header v-if="pagination === true">
    <YButton @click="previosPage" v-if="pageNumber >0">назад</YButton>
    <YButton @click="nextPage" >вперед</YButton>
  </header>
  <ul class="list">
    <y-list-item
      v-for="item in filtredItems"
      :key="`${item.id}${item[keyOfName]}`"
      :selectable="selectable"
      :editable="(item.type_id === 6 || item.type_id === 7) ? false : editable"
      :active="item.active"
      @select="$emit('select', item)"
      @edit="$emit('edit', item)"
    >
      {{showId ? `${item[showId]} ` : ""}} {{item[keyOfName]}}

    </y-list-item>
  </ul>

</template>

<script>

import YButton from "@/components/UI/YButton.vue";
import YCoolButton from "@/components/UI/YCoolButton.vue";

export default {
  name: "YList",
  components: {YCoolButton, YButton},
  data(){
    return {
      pageNumber: 0,
    }
  },
  props: {
    pagination: {
      type: Boolean,
      default: false
    },
    size:{
      type: Number,
      require: false,
      default: 5
    },
    items: {
      type: Array,
      default: [
        { name: 'test1' },
        { name: 'test2' },
        { name: 'test3' },
      ]
    },
    keyOfName: {
      type: String,
      default: name
    },
    showId: {
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filtredItems() {
      let pagination = this.pagination
      const filteredArray = [];
      const games = this.items.filter(el => {
        return (el.type_id === 6 || el.type_id === 7)
      })
      const tests = this.items.filter(el => {
        return !(el.type_id === 6 || el.type_id === 7)
      })
      if (pagination === false){
        return filteredArray.concat(games,tests)
      }else{
        const start = this.pageNumber * this.size, end = start + this.size
        return filteredArray.concat(games,tests).slice(start,end)
      }
    },
  },
  methods:{
    nextPage(){
      this.pageNumber++;
    },
    previosPage(){
      this.pageNumber--;
    }
  },
}
</script>

<style scoped>
.list {
  display: grid;
  grid-gap: 1rem;
  list-style: none;
}
</style>

<!--
<style scoped>
.YList{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.elipce {
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  height: 25px;
  background: linear-gradient(155.31deg, rgba(255, 255, 255, 0.5) 12.33%, rgba(255, 255, 255, 0) 34.31%, rgba(255, 255, 255, 0) 52.66%, rgba(255, 255, 255, 0.54) 74.67%);
  background-blend-mode: overlay;
  border-radius: 50%;
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.5);

}
.name{
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-indent: 40px;
  color: #FFFFFF;

}
.list_item{
  display: grid;
  grid-template-rows:1fr;
  grid-template-columns:1fr 1fr 1fr;
  align-items: center;
  grid-gap: 10px;
  width: 50vh;

}
.list_item:nth-child(1){
  grid-column-start: 1;
}
.list_item:nth-child(2){
  grid-column-start: 2;
}
.list_item:nth-child(3){
  grid-column-start: 3;
}

</style>-->

<template>
    <ul class="list">
        <y-list-item
                v-for="item in filteredItems"
                :key="`${item.id}${item[keyOfName]}`"
                :selectable="selectable"
                :editable="(item.type_id === 6 || item.type_id === 7) ? false : editable"
                :active="item.active"
                :deletable="deletable"
                :clickable="clickable"

                @select="$emit('select', item)"
                @edit="$emit('edit', item)"
                @delete="$emit('delete', item)"
                @clicked="$emit('clicked', item)"
        >
            {{ showId ? (item[showId]) ? `${item[showId]} ` : 'Администратор' : "" }} {{ item[keyOfName] }}

        </y-list-item>
    </ul>
    <footer class="container-fluid footer-container" v-if="pagination === true">
        <YButton @click="previousPage" :class="{'hide-pagination': !showPrev}" class="prev"><i
                class="fa-solid fa-chevron-left"></i> Назад
        </YButton>
        <YButton @click="nextPage" :class="{'hide-pagination': !showNext}" class="next">Далее <i
                class="fa-solid fa-chevron-right"></i></YButton>
    </footer>
</template>

<script>

import YButton from "@/components/UI/YButton.vue";
import YCoolButton from "@/components/UI/YCoolButton.vue";

export default {
  name: "YList",
  components: {YCoolButton, YButton},
  data() {
    return {
      pageNumber: 0,
      maxPage: 100,
    }
  },
  created() {
    this.maxPage = Math.ceil(this.items.length / this.pageSize);
  },
  props: {
    pagination: {
      type: Boolean,
      default: false
    },
    paginationBlock: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      require: false,
      default: 5
    },
    items: {
      type: Array,
      default: [
        {name: 'test1'},
        {name: 'test2'},
        {name: 'test3'},
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
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    clickable: {
        type: Boolean,
        default: false
    }
  },
  computed: {
    filteredItems() {
      let pagination = this.pagination
      const filteredArray = [];
      const games = this.items.filter(el => {
        return (el.type_id === 6 || el.type_id === 7)
      })
      const tests = this.items.filter(el => {
        return !(el.type_id === 6 || el.type_id === 7)
      })
      console.log(this.items, tests, games)
      if (pagination === false) {
        return filteredArray.concat(games, tests)
      } else {
        const start = this.pageNumber * this.pageSize, end = start + this.pageSize
        return filteredArray.concat(games, tests).slice(start, end)
      }
    },
    showNext() {
      let filteredArray = []
      const games = this.items.filter(el => {
        return (el.type_id === 6 || el.type_id === 7)
      })
      const tests = this.items.filter(el => {
        return !(el.type_id === 6 || el.type_id === 7)
      })
      const start = (this.pageNumber + 1) * this.pageSize, end = start + this.pageSize
      return (filteredArray.concat(games, tests).slice(start, end).length > 0)
    },
    showPrev() {
      return this.pageNumber > 0;
    }
  },
  methods: {
    nextPage() {
      if (this.showNext)
        this.pageNumber++;
    },
    previousPage() {
      if (this.showPrev)
        this.pageNumber--;
    }
  },
}
</script>

<style scoped>
.next {
    color: white;
}

.prev {
    color: white;
}

.list {
    display: grid;
    grid-gap: 1rem;
    list-style: none;
    width: 100%;
}

.hide-pagination {
    color: white;
    opacity: 0.2;
}

.footer-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-height: 6vh;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    padding-top: 1rem;
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

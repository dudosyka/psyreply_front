<template>
    <v-list-item
      class="list-item list-item-active"
      v-for="item in items"
      :key="item.id"
      :title="item.login"
      :prepend-avatar="item.avatar"
      @click="$emit('selected', item)"
    ></v-list-item>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    selected: {

    }
  }
}
</script>

<style scoped>
.list-item {
  height: 5rem;
  transition: background .3s ease-in-out;
  width: 100%;

  background-color: transparent!important; /*убрать импотант после реализации активного класса*/
  border-bottom: 1px solid var(--border-dark);
}
.list-item-active {
  background-color: var(--acrylic-blur-dark);
  color: white;
}
.list-item:last-child {
  border-bottom: none;
}
.list-item:hover {
  background-color: var(--acrylic-blur-dark)!important; /*убрать импотант после реализации активного класса*/
  color: white;
}
</style>

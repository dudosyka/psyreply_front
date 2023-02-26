<template>
    <v-list-item
      class="list-item list-item-active"
      v-for="item in items"
      :key="item.title"
      :title="item.name"
      :subtitle="item.date"
      :prepend-avatar="item.avatar"
    ></v-list-item>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Виктор Палыч',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        name: 'DruG__SaTaNbI',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        name: 'Курамжбон Буркахметов',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        name: 'Сука блядская',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        name: 'Ыыыыоаоаоа Оаоаоы )))',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        name: 'Ыыыыоаоаоа Оаоаоы )))',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        name: 'Ыыыыоаоаоа Оаоаоы )))',
        date: '24.08'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        name: 'Ыыыыоаоаоа Оаоаоы )))',
        date: '24.08'
      },
    ],
  }),
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

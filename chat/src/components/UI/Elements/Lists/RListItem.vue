<template>
    <v-list-item
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
      { type: 'divider', inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        name: 'DruG__SaTaNbI',
        date: '24.08'
      },
      { type: 'divider', inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        name: 'Курамжбон Буркахметов',
        date: '24.08'
      },
      { type: 'divider', inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        name: 'Сука блядская',
        date: '24.08'
      },
      { type: 'divider', inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        name: 'Ыыыыоаоаоа Оаоаоы )))',
        date: '24.08'
      },
      { type: 'divider', inset: true },
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

</style>

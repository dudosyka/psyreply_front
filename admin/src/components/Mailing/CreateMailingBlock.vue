<template>
  <y-modal class="modal" v-if="window === 'main'">
    <header class="header">
      <!--
        Если будешь заменять эту кнопку то не забудь в том элементе, на который заменишь, прописать точно такой же @click
        Подробнее см. пояснение внутри MailingView в методе close
      -->
      <y-left-arrow-button @click="$emit('close')" />
      <h1 class="heading">Новый блок</h1>


    </header>
    <y-input
        placeholder="Название блока"
    />

    <y-cool-button @click="createElement">Добавить элемент</y-cool-button>

    <template v-for="element in elements">
      <h1>{{element.name}}</h1>
    </template>

    <y-cool-button>Сохранить рассылку</y-cool-button>
  </y-modal>
</template>

<script>
export default {
  name: "CreateMailingBlock",
  data() {
    return {
      window: 'main',
      elements: [
        {name: "test"}
      ]
    }
  },
  methods: {
    createElement() {
      this.elements.push({name: 'test' + Date.now()})
    }
  },
  // computed: {
  //   elements() {
  //     return []
  //   }
  // }
}
</script>

<style scoped>

</style>
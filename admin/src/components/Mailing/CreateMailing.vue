<template>
  <y-modal class="modal" v-if="window === 'main'">
    <header class="header">
      <!--
        Если будешь заменять эту кнопку то не забудь в том элементе, на который заменишь, прописать точно такой же @click
        Подробнее см. пояснение внутри MailingView в методе close
      -->
      <y-left-arrow-button @click="$emit('close')" />
      <h1 class="heading">Новая рассылка</h1>

      <y-modal class="time-picker">Время рассылки -
        <y-input max="99" min="0" type="number" v-model="time.hours" placeholder="чч" class="time-picker__input"/>:
        <y-input max="59" min="0" type="number" v-model="time.minutes" placeholder="мм" class="time-picker__input"/>:
        <y-input max="59" min="0" type="number" v-model="time.seconds" placeholder="сс" class="time-picker__input"/>
      </y-modal>

      <y-button @click="openCreateBlock" :plus="true">Добавить блок</y-button>

    </header>
    <y-input
      placeholder="Название рассылки"
    />

    <y-cool-button>Сохранить рассылку</y-cool-button>
  </y-modal>
  <CreateMailingBlock
      v-if="window === 'createBlock'"
      @close="window = 'main'"
  >

  </CreateMailingBlock>
</template>

<script>
import CreateMailingBlock from "@/components/Mailing/CreateMailingBlock.vue";
import YModal from "@/components/UI/YModal.vue";

export default {
  name: "CreateMailing",
  components: {
    YModal,
    CreateMailingBlock,
  },
  emits: ['close'],
  data() {
    return {
      time: {
        hours: null,
        minutes: null,
        seconds: null
      },
      window: 'main',
    }
  },
  created() {
  },
  methods: {
    openCreateBlock() {
      this.window = 'createBlock'
    }
  }
}
</script>

<style scoped>
.modal {
  display: grid;
  grid-gap: 1rem;
}
.header {
  display: grid;
  grid-template-columns: auto 1fr auto min-content;
  grid-gap: 2rem;
  justify-content: start;
  align-items: center;
}

.time-picker {
  font-size: 1.2rem;
  padding: .2rem;
  display: grid;
  grid-template-columns: auto repeat(3, 3.3rem min-content);
  align-items: center;
  grid-gap: .1rem;
}
.time-picker__input {
  padding: .1rem;
}
</style>

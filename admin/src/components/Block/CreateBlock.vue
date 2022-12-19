<template>
  <y-modal class="modal" v-if="window === 'main'">
    <header class="header">
      <y-left-arrow-button @click="$emit('close')" />
      <h1 class="heading">Новый блок</h1>

      <y-modal class="time-picker">Время на прохождение -
        <y-input max="99" min="0" type="number" v-model="block.hours" placeholder="чч" class="time-picker__input"/>:
        <y-input max="59" min="0" type="number" v-model="block.minutes" placeholder="мм" class="time-picker__input"/>:
        <y-input max="59" min="0" type="number" v-model="block.seconds" placeholder="сс" class="time-picker__input"/>
      </y-modal>

      <y-button @click="window = 'createTest'" :plus="true">Добавить тест</y-button>

    </header>
    <y-input
      v-model.trim="block.name"
      placeholder="Название блока"
    />
    <y-list
      :items="tests"
      key-of-name="title"
      :selectable="true"
      @select="selectTest"
    />
    <y-cool-button @click="saveBlock">Сохранить блок</y-cool-button>
  </y-modal>

  <create-test
    v-if="window === 'createTest'"
    @close="window = 'main'"
  />
</template>

<script>
import CreateTest from '@/components/Test/CreateTest';
import Test from '@/api/admin/Test'
import Block from '@/api/admin/Block';

export default {
  name: "CreateBlock",
  components: {
    CreateTest
  },
  emits: ['close'],
  data() {
    return {
      window: 'main',
      block: {
        name: null,
        hours: null,
        minutes: null,
        seconds: null
      },
      tests: []
    }
  },
  created() {
    const test = new Test()
    test.getAll({ filters: {  } })
      .then(res => {
        if (res.ok) {
          res.json().then(r => this.tests = r)
        } else {
          alert(res.msg())
        }
      })
  },
  methods: {
    selectTest(n) {
      let test = this.tests.filter(el => el.id === n.id)
      test = test[0]
      if ('active' in test) {
        test.active = !test.active
      } else {
        test['active'] = true
      }
    },
    saveBlock() {
      const body = {}

      body.name = this.block.name

      let time = 0

      time += this.block.hours * 60 * 60 * 1000
      time += this.block.minutes * 60 * 1000
      time += this.block.seconds * 1000

      body.time = time

      const tests = this.tests.filter(el => el.active)

      body.tests = []

      tests.map(el => body.tests.push(el.id))

      console.log(body.test)

      const block = new Block()
      block.create('', body)
        .then(res => {
          console.log(res)
          if (res.ok) {
            alert('Блок успешно создан')
            this.$emit('close')
          } else {
            alert(res.msg())
            console.log(res)
          }
        })
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

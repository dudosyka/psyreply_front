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

      <y-button @click="createTest" :plus="true">Добавить тест</y-button>

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
    @close="createTestClosed"
  />
</template>

<script>
import CreateTest from '@/components/Test/CreateTest';
import Test from '@/api/admin/Test'
import Block from '@/api/admin/Block';
import mainConf, {ProjectState} from "../../../../main.conf";

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
    this.updateTestList()
  },
  methods: {
    updateTestList() {
      const test = new Test()
      test.getAll({ filters: {  } })
          .then(res => {
            if (res.ok) {
              res.json().then(r => this.tests = r)
            } else {
              this.$store.commit('openErrorPopup', res.msg())
            }
          })
    },
    createTest() {
      this.window = 'createTest';
    },
    createTestClosed() {
      this.window = 'main'
      this.updateTestList()
    },
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

      if (mainConf.projectState === ProjectState.dev)
        console.log(body.test)

      const block = new Block()
      block.create('', body)
        .then(res => {
          if (mainConf.projectState === ProjectState.dev)
            console.log(res)
          if (res.ok) {
            this.$store.commit('openPopup', "Блок успешно создан!")
            this.$emit('close')
          } else {
            this.$store.commit('openErrorPopup', res.msg())
            if (mainConf.projectState === ProjectState.dev)
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

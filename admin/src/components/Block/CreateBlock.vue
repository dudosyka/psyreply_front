<template>
  <y-modal class="modal" v-if="window === 'main'">
    <div class="container-fluid main-container">
    <header class="header">
      <y-left-arrow-button @click="$emit('close')" />
      <h3 class="heading">Новый блок</h3>
        <div class="row timer">
          <y-input max="99" min="0" type="number" v-model="block.hours" placeholder="чч" class="time-picker__input"/>:
          <y-input max="59" min="0" type="number" v-model="block.minutes" placeholder="мм" class="time-picker__input"/>:
          <y-input max="59" min="0" type="number" v-model="block.seconds" placeholder="сс" class="time-picker__input"/>
        </div>
      <y-button class="addbtn" @click="createTest" :plus="true">Добавить тест</y-button>

    </header>
    <y-input class="nameinput"
      v-model.trim="block.name"
      placeholder="Название блока"
    />
    <y-list
      :items="tests"
      key-of-name="title"
      :selectable="true"
      @select="selectTest"
      :size="5"
      :pagination="true"
      :pagination-block="true"
    />
    <y-cool-button @click="saveBlock">Сохранить блок</y-cool-button>
    </div>
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
      const selected = this.$store.getters.blockCreate.selectedTests;
      const test = new Test()
      test.getAll({ filters: {  } })
          .then(res => {
            if (res.ok) {
              res.json().then(r => this.tests = r.body.map(el => {
                if (selected.includes(el.id)) {
                  el.active = true;
                }
                return el;
              }))
            } else {
              this.$store.commit('openErrorPopup', res.msg())
            }
          })
    },
    createTest() {
      this.$store.commit('blockCreateSetTests', this.tests.filter(el => el.active).map(el => el.id));
      this.window = 'createTest';
    },
    createTestClosed(createdTestId) {
      const selected = this.$store.getters.blockCreate.selectedTests;
      selected.push(createdTestId)
      this.$store.commit('blockCreateSetTests', selected);
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
          this.$store.commit('blockCreateSetTests', []);
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
.input {
  padding-left: 1rem;
  height: 2rem;
  background: var(--acrylic-blur-light)!important;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 0.5rem;
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
}
.input:hover {
  padding-left: 1rem;
  height: 2rem;
  background: var(--acrylic-blur-light)!important;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 0.5rem;
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
}
.main-container {
  width: 70vw;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.nameinput {
  background: var(--acrylic-blur-light)!important;
  height: 3vh;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
}
.nameinput:hover {
  background: var(--acrylic-blur-light)!important;
  height: 3vh;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
}
.addbtn {
  width: 10rem;
}
.modal {
  align-items: center;
  display: flex;
  width: 90vw;
  padding-right: 3rem;
  grid-gap: 2.5625rem;
  flex-direction: row;
}
.header {
  display: grid;
  grid-template-columns: auto 1fr auto min-content;
  grid-gap: 2rem;
  justify-content: start;
  align-items: center;
}

.time-picker {
  font-size: 1rem;
  padding: 0.2rem;
  display: grid;
  grid-template-columns: auto repeat(3, 3.3rem min-content);
  align-items: center;
  grid-gap: 0.1rem;
  padding: 10px;
  border-radius: 9px;
}
.time-picker__input {
  padding: .1rem;
  border-radius: 4px;
}
</style>

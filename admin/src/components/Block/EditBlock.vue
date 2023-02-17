<template>
  <y-modal class="modal">
    <div class="container-fluid main-container">
      <header class="header">
        <y-left-arrow-button @click="$emit('close')" />
        <h1 class="heading">Редактирование блока "{{ block.name }}"</h1>
        <template v-if="block.company_id != null">
          <y-button :plus="true" @click="generateBlockToken()">Сгенерировать токен</y-button>
          <y-input max="1000" min="0" v-model.trim="block.week" type="number" />
        </template>
      </header>
      <div class="container container-main">
        <header class="header edit">
          <h3 class="heading heading-small">Изменение параметров блока "{{ block.name }}"</h3>
        </header>
        <div class="row edit-row">
          <y-input class="name" v-model.trim="block.name" />
          <div class="time-picker row">
            <h5>Время на прохождение</h5>
            <y-input max="99" min="0" type="number" v-model="newTime.hours" placeholder="чч" class="time-picker__input"/>:
            <y-input max="59" min="0" type="number" v-model="newTime.minutes" placeholder="мм" class="time-picker__input"/>:
            <y-input max="59" min="0" type="number" v-model="newTime.seconds" placeholder="сс" class="time-picker__input"/>
          </div>
        </div>
        <div class="row button-row">
          <y-cool-button @click="updateBlock">Сохранить обновленный блок "{{ block.name }}"</y-cool-button>
        </div>
      </div>
      <div class="container container-second">
        <div v-if="block.tests.length > 0">
          <header class="header">
            <h3 class="heading-small">Редактирование тестов блока</h3>
          </header>
          <y-list
              v-if="block.tests.length > 0"
              key-of-name="title"
              :items="block.tests"
              :selectable="true"
              @select="selectAddTest"
              :pagination="true"
          />
          <div class="row button-row">
            <y-cool-button @click="removeTests">Удалить тест из блока</y-cool-button>
          </div>
        </div>
      </div>

      <div v-if="tests.length > 0">
        <header class="header">
          <h2 class="heading">Добавление тестов в блок</h2>
        </header>
        <y-list
            :selectable="true"
            @select="selectRemoveTest"
            :items="tests"
            key-of-name="title"
            :pagination="true"
        />
        <y-cool-button @click="addTests">Добавить в блок</y-cool-button>
      </div>
      <div class="danger">
        <header class="header">
          <h3 class="heading heading-small">Опасная зона</h3>
        </header>
        <div class="row button-row">
          <y-cool-button @click="removeBlock">Удалить блок</y-cool-button>
        </div>
      </div>
    </div>
  </y-modal>
</template>

<script>
import Block from '@/api/admin/Block';
import YCoolButton from '@/components/UI/YCoolButton';
import Test from '@/api/admin/Test';
import YPopupWarn from "@/components/UI/YPopupWarn";
import mainConf, {ProjectState} from "../../../../main.conf";
function update(data) {
  const block = new Block()
  block.get(data.id)
      .then(res => {
        if (res.ok) {
          res.json().then(res => {
            const r = res.body;
            data.block = r
            data.block.week = parseInt(data.block.week)
            const hours = Math.floor(r.time / (60 * 60 * 1000))
            r.time -= hours * 60 * 60 * 1000
            const minutes = Math.floor(r.time / (60 * 1000))
            r.time -= minutes * 60 * 1000
            const seconds = Math.floor(r.time / 1000)
            data.newTime = { hours, minutes, seconds }
          })
        } else {
          this.$store.commit('openErrorPopup', res.msg())
        }
      })
  const test = new Test()
  test.getAll({ filters: { "except_block": data.id } })
      .then(res => {
        if (res.ok) {
          res.json().then(r => data.tests = r.body)
        } else {
          this.$store.commit('openErrorPopup', res.msg())
          if (mainConf.projectState === ProjectState.dev)
            console.log(res)
        }
      })
}
export default {
  name: "EditBlock",
  components: {YCoolButton, YPopupWarn},
  props: ['id'],
  data() {
    return {
      tests: [],
      block: {
        tests: [],
      },
      newTime: {
        hours: null,
        minutes: null,
        seconds: null
      }
    }
  },
  created() {
    update(this)
  },
  methods: {
    async generateBlockToken() {
      const block = new Block();
      await block.generateToken(this.block).then(res => {
        window.prompt("Нажмите Ctrl+C", JSON.parse(res).body);
      });
    },
    update() {
      update(this)
    },
    selectAddTest(n) {
      if (mainConf.projectState === ProjectState.dev)
        console.log(n)
      //this.block.tests.forEach(el => el.active = false)
      let test = this.block.tests.filter(el => el.id === n.id)
      test = test[0]
      if ('active' in test) {
        test.active = !test.active
      } else {
        test['active'] = true
      }
    },
    selectRemoveTest(n) {
      if (mainConf.projectState === ProjectState.dev)
        console.log(n)
      //this.tests.forEach(el => el.active = false)
      let test = this.tests.filter(el => el.id === n.id)
      test = test[0]
      if ('active' in test) {
        test.active = !test.active
      } else {
        test['active'] = true
      }
    },
    removeTests() {
      const test = new Test()
      const removeTests = this.block.tests.filter(el => el.active)
      if (removeTests.length === 0) {
        return this.$store.commit('openErrorPopup', 'Выберите тест для добавления')
      }
      const body = {
        tests: []
      }
      removeTests.forEach(el => body.tests.push(el.id))
      test.removeFromBlock(this.id, body)
          .then(res => {
            if (res.ok) {
              this.$store.commit('openPopup', `Тесты успешно удалены из ${this.block.name}`)
              this.update()
            } else {
              this.$store.commit('closeErrorPopup', res.msg())
            }
          })
    },
    addTests() {
      const test = new Test()
      const addTests = this.tests.filter(el => el.active)
      if (addTests.length === 0) {
        return this.$store.commit('openErrorPopup', 'Выберите тест для добавления')
      }
      const body = {
        tests: []
      }
      addTests.forEach(el => body.tests.push(el.id))
      test.addToBlock(this.id, body)
          .then(res => {
            if (res.ok) {
              this.$store.commit('openPopup', `Тесты добавлены в ${this.block.name}`)
              this.update()
            } else {
              this.$store.commit('openErrorPopup', res.msg())
            }
          })
    },
    updateBlock() {
      if (this.block.name.length < 1) {
        return this.$store.commit('openErrorPopup', 'Название слишком короткое')
      }
      let time = 0
      time += this.newTime.hours * 60 * 60 * 1000
      time += this.newTime.minutes * 60 * 1000
      time += this.newTime.seconds * 1000
      const block = new Block()
      const body = {
        name: this.block.name,
        time
      }
      block.update(this.id, body)
          .then(res=> {
            if (res.ok) {
              this.$store.commit('openPopup', 'Блок успешно сохранен')
              this.update()
            } else {
              this.$store.commit('openErrorPopup', res.msg())
            }
          })
    },
    removeBlock() {
      this.$store.commit('openWarnPopup', { message: "Вы уверены, что хотите удалить блок? (Удаление блока НЕ повлечёт за собой удаление тестов внутри него)", acceptCallback: () => {
          const block = new Block()
          const body = {
            blocks: [this.id]
          }
          block.remove(body)
              .then(res => {
                if (res.ok) {
                  this.$store.commit('openPopup', "Блок успешно удален!")
                  this.$emit('close')
                } else {
                  this.$store.commit('openErrorPopup', res.msg)
                }
              })
        }})
    }
  }
}
</script>

<style scoped>
.button-row {
  width: 100%;
  display: flex;
  justify-content: left;
}
.footer-container {
  margin-bottom: 1rem!important;
}
.btn {
  max-width: 20vw;
  width: 100%!important;
}
.heading-small {
  margin-bottom: 1rem;
}
.name {
  width: 40vw;
}
.edit-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.main-container {
  width: 70vw;
  display: flex;
  padding-right: 1rem;
  gap: 3rem;
  max-height: 60vh;
  overflow-y: scroll;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.input {
  padding-left: 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: start;
  height: 2rem;
  grid-gap: 2rem;
  background: var(--acrylic-blur-light)!important;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 0.5rem;
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
}
.input:hover {
  padding-left: 1rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: start;
  height: 2rem;
  grid-gap: 2rem;
  background: var(--acrylic-blur-light)!important;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 0.5rem;
  border-color: var(--border-dark);
  border-width: 1px;
  border-style: solid;
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
  grid-template-columns: auto 1fr min-content min-content;
  grid-gap: 2rem;
  justify-content: start;
  align-items: center;
}
.time-picker {
  font-size: 1.2rem;
  padding: .2rem 1rem;
  display: grid;
  grid-template-columns: min-content repeat(3, 3.3rem min-content);
  align-items: center;
  grid-gap: .1rem;
  white-space: nowrap;
}
.time-picker__input {
  padding: .1rem;
}
</style>
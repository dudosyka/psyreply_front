<template>
    <y-modal class="modal">
        <header class="header">
            <y-left-arrow-button @click="$emit('close')"/>
            <h1 class="heading">Редактирование: {{ block.name }}</h1>
            <template v-if="block.company_id != null">
                <y-button class="gentoken-btn" :plus="true" @click="generateBlockToken()">Сгенерировать токен</y-button>
                <y-input max="1000" min="0" class="week-input" v-model.trim="block.week" type="number"/>
            </template>
        </header>

        <y-modal>
            <header class="header">
                <h2 class="heading">Изменение параметров {{ block.name }}</h2>
            </header>
            <y-input v-model.trim="block.name"/>
            <y-modal class="time-picker">Время на прохождение -
                <y-input max="99" min="0" type="number" v-model="newTime.hours" placeholder="чч"
                         class="time-picker__input"/>
                :
                <y-input max="59" min="0" type="number" v-model="newTime.minutes" placeholder="мм"
                         class="time-picker__input"/>
                :
                <y-input max="59" min="0" type="number" v-model="newTime.seconds" placeholder="сс"
                         class="time-picker__input"/>
            </y-modal>
            <y-cool-button @click="updateBlock">Сохранить обновленный {{ block.name }}</y-cool-button>
        </y-modal>

        <y-modal v-if="block.tests.length > 0">
            <header class="header">
                <h2 class="heading">Редактирование тестов блока</h2>
            </header>
            <y-list
                    v-if="block.tests.length > 0"
                    key-of-name="title"
                    :items="block.tests"
                    :selectable="true"
                    @select="selectAddTest"
                    :pagination="true"
            />
            <y-cool-button @click="removeTests">Удалить тест из блока</y-cool-button>
        </y-modal>

        <y-modal v-if="tests.length > 0">
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
        </y-modal>
        <y-modal>
            <header class="header">
                <h2 class="heading">Опасная зона</h2>
            </header>
            <y-cool-button @click="removeBlock">Удалить блок</y-cool-button>
        </y-modal>

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
          
          data.newTime = {hours, minutes, seconds}
        })
      } else {
        this.$store.commit('openErrorPopup', res.msg())
      }
    })
  
  const test = new Test()
  test.getAll({filters: {"except_block": data.id}})
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
      
      if (!this.block.week) {
        this.$store.commit('openErrorPopup', 'Для генерации токена укажите неделю! (текстовое поле справа от кнопки генерации)')
        return;
      }
      
      const token = await block.generateToken(this.block).then(res => {
        return JSON.parse(res).body;
      });
      
      navigator.clipboard.writeText(token).then(() => {
        this.$store.commit('openPopup', "Токен скопирован в буфер обмена!")
      }).catch(() => {
        window.prompt("Нажмите Ctrl+C", token);
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
        .then(res => {
          if (res.ok) {
            this.$store.commit('openPopup', 'Блок успешно сохранен')
            this.update()
          } else {
            this.$store.commit('openErrorPopup', res.msg())
          }
        })
    },
    removeBlock() {
      this.$store.commit('openWarnPopup', {
        message: "Вы уверены, что хотите удалить блок? (Удаление блока НЕ повлечёт за собой удаление тестов внутри него)",
        acceptCallback: () => {
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

.week-input {
    font-size: 1rem;
    padding: 1rem;
}
</style>

<template>
  <y-modal class="main">
    <y-popup-warn></y-popup-warn>
    <header class="header">
      <y-left-arrow-button @click="close" />
      <h1>Редактирование: {{test.title}}</h1>
    </header>

    <create-test
      :test-id="id"
      :title="test.title"
    />

    <y-modal class="block" v-if="blocks.length > 0">
      <header>
        <h2 class="heading">Добавить в блок</h2>
      </header>
      <y-list
        key-of-name="name"
        :selectable="true"
        :items="blocks"
        @select="selectBlocks"
      />
      <y-cool-button @click="addToBlock">Добавить в блок</y-cool-button>
    </y-modal>

    <y-modal class="block">
      <h2 class="heading">Опасная зона</h2>
      <y-cool-button @click="removeTest">Удалить тест</y-cool-button>
    </y-modal>
  </y-modal>
</template>

<script>
import CreateTest from '@/components/Test/CreateTest';

import Test from '@/api/admin/Test';
import Block from '@/api/admin/Block';
import YPopupWarn from "@/components/UI/YPopupWarn.vue";

function update(data) {
  const test = new Test()
  test.get(data.id)
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.test = r)
      } else {
        this.$store.commit('openErrorPopup', res.msg())
      }
    })

  const block = new Block()
  block.getAll({ filters: {exclude_test: data.id} })
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.blocks = r)
      } else {
        this.$store.commit('openErrorPopup', res.msg())
      }
    })
}

export default {
  name: "EditTest",
  components: {
    YPopupWarn,
    CreateTest
  },
  props: {
    id: Number
  },
  data() {
    return {
      test: {},
      blocks: []
    }
  },
  created() {
    update(this)
  },
  methods: {
    close() {
      this.$emit('close')
    },
    selectBlocks(n) {
      let block = this.blocks.filter(el => el.id === n.id)
      block = block[0]
      if ('active' in block) {
        block.active = !block.active
      } else {
        block['active'] = true
      }
    },
    addToBlock() {
      const blocks = this.blocks.filter(el => el.active)

      if (blocks.length === 0) {
        this.$store.commit('openErrorPopup', "Вы должны выбрать блоки!")
        return;
      }

      const body = {
        tests: [this.id]
      }

      const test = new Test()
      for (let block of blocks) {
        test.addToBlock(block.id, body)
          .then(res => {
            if (res.ok) {
              this.$store.commit('openPopup', `Тест ${this.test.title} успешно добавлен в блок ${blocks[0].name}`)
              block.active = false
            } else {
              if (res.err.status === 409) {
                this.$store.commit('openErrorPopup', "Тест уже добавлен в блок")
              } else {
                this.$store.commit('openErrorPopup', res.msg())
              }
            }
          })
      }
    },
    removeTest() {
      this.$store.commit('openWarnPopup', {
        message: `Вы уверены что хотите удалить этот тест?`,
        acceptCallback: () => {
          const test = new Test()
          test.remove(this.test.id)
            .then(res => {
              if (res.ok) {
                this.$store.commit('openPopup', "Тест успешно удален!")
                this.$emit('close')
                this.close()
              } else {
                this.$store.commit('openErrorPopup', res.msg())
                console.log(res)
              }
            })
        }
      });
    }
  }
}
</script>

<style scoped>
.main {
  display: grid;
  grid-gap: 1rem;
}
.header {
  display: grid;
  grid-template-columns: auto max-content;
  justify-content: left;
  grid-gap: 1rem;
}
.block {
  display: grid;
  grid-gap: .8rem;
}
hr {
  margin-top: 30px;
  margin-bottom: 30px;
  min-width: 30vw;
  border-left: 0px solid white;
  border-right: 0px solid white;
  border-bottom: 0px solid white;
  border-top: 1px solid rgba(255, 255, 255, 0.52);
}
</style>

<template>
  <y-modal v-if="window === 'main'" class="modal">
    <header class="header">
      <y-left-arrow-button @click="$emit('close')" />
      <h1 class="heading">Новая компания</h1>
      <y-button @click="this.window = 'addBlock'" :plus="true">Добавить блок</y-button>
    </header>
    <y-input
        v-model="company.name"
        placeholder="Название компании"
    />
    <y-list
      @select="selectBlock"
      v-if="blocks.length > 0"
      key-of-name="name"
      :items="blocks"
      :selectable="true"
    />
    <y-cool-button @click="createCompany">Создать компанию</y-cool-button>
  </y-modal>

  <create-block
    v-if="window === 'addBlock'"
    @close="close"
  />
</template>

<script>
import CreateBlock from '@/components/Block/CreateBlock';
import Block from '@/api/admin/Block';
import Company from '@/api/admin/Company';

export default {
  name: "CreateCompany",
  components: {
    CreateBlock
  },
  emits: ['close'],
  data() {
    return {
      window: 'main',
      company: {
        name: '',
      },
      blocks: []
    }
  },
  created() {
    const block = new Block()
    block.getAll({ filters: { "company_id": null }})
      .then(res => {
        if (res.ok) {
          res.json().then(r => this.blocks = r)
        }
      })
  },
  methods: {
    update() {
      const block = new Block()
      block.getAll({ filters: { "company_id": null }})
        .then(res => {
          if (res.ok) {
            res.json().then(r => this.blocks = r)
          }
        })
    },
    close() {
      this.window = 'main'
      this.update()
    },
    selectBlock(n) {
      console.log(n)
      let block = this.blocks.filter(el => el.id === n.id)
      block = block[0]
      if ('active' in block) {
        block.active = !block.active
      } else {
        block['active'] = true
      }
    },
    createCompany() {
      const company = new Company()
      const blocks = []
      this.blocks.map(el => {if (el.active) blocks.push(el.id)})
      const body = {}
      if (this.company.name.length > 3) {
        body.company = this.company
      } else {
        alert('Слишком короткоее название')
      }
      if (blocks.length > 0) body.company.inputBlocks = blocks
      company.create('', body)
        .then(res => {
          if (res.ok) {
            alert('компания создана')
            this.$emit('close')
          } else {
            alert(res.msg())
            console.log(res)
          }
        })
    },
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
  grid-template-columns: auto 1fr min-content;
  grid-gap: 2rem;
  justify-content: start;
  align-items: center;
}
</style>

<template>
  <y-modal class="main">
    <header class="header">
      <y-left-arrow-button @click="$emit('close')" />
      <h1>Редактирование: {{company.name}}</h1>
    </header>
    <y-modal class="block">
      <header>
        <h2 class="heading">Редактирование основной информации</h2>
      </header>
      <y-input v-model.trim="company.name" />
      <y-cool-button @click="edit">Сохранить</y-cool-button>
    </y-modal>
    <y-modal class="block" v-if="company.blocks.length > 0">
      <header>
        <h2 class="heading">Блоки в компании</h2>
      </header>
      <y-list
        key-of-name="name"
        :selectable="true"
        :items="company.blocks"
        @select="selectRemoveBlock"
      />
      <y-cool-button @click="removeBlock">Удалить блок из {{ company.name }}</y-cool-button>
    </y-modal>
    <y-modal class="block">
      <header>
        <h2 class="heading">Блоки, которые можно добавить</h2>
      </header>
      <y-list
        v-if="blocks.length > 0"
        key-of-name="name"
        :items="blocks"
        :selectable="true"
        @select="selectAddBlock"
      />
      <y-cool-button @click="addBlocks">Добавить блок в {{ company.name }}</y-cool-button>
    </y-modal>
  </y-modal>
</template>

<script>
import Company from '@/api/admin/Company';
import Block from '@/api/admin/Block';
import YCoolButton from '@/components/UI/YCoolButton';

function update(data) {
  const company = new Company()
  company.get(data.companyId)
    .then(res => {
      if (res.ok) {
        res.json().then(r => {
          for (let key in r) data.company[key] = r[key]
        })
      }
    })

  const block = new Block()
  block.getAll({ filters: { "company_id": null }})
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.blocks = r)
      }
    })
  block.getAll({ filters: { "company_id": data.companyId }})
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.company.blocks = r)
      }
    })
}

export default {
  name: "EditCompany",
  components: {YCoolButton},
  props: {
    companyId: Number
  },
  data() {
    return {
      blocks: [],
      company: {
        id: null,
        name: null,
        createdAt: null,
        updatedAt: null,
        blocks: []
      }
    }
  },
  created() {
    update(this)
  },
  methods: {
    selectAddBlock(n) {
      let block = this.blocks.filter(el => el.id === n.id)
      block = block[0]
      if ('active' in block) {
        block.active = !block.active
      } else {
        block['active'] = true
      }
    },
    selectRemoveBlock(n) {
      let block = this.company.blocks.filter(el => el.id === n.id)
      block = block[0]
      if ('active' in block) {
        block.active = !block.active
      } else {
        block['active'] = true
      }
    },
    addBlocks() {
      const blockRemove = this.blocks.filter(el => el.active)

      if (blockRemove.length === 0) {
        return this.$store.commit('openErrorPopup', 'Выберите блок для добавления')
      }

      const body = {
        blocks: []
      }

      blockRemove.forEach(el => body.blocks.push(el.id))

      const block = new Block()
      block.create(`copy/${this.companyId}`, body)
        .then(res => {
          if (res.ok) {
            console.log(res)
            this.$store.commit('openPopup', 'Блоки добавлены')
            this.update()
          } else {
            alert(res.msg())
          }
        })
    },
    removeBlock() {
      const blockRemove = this.company.blocks.filter(el => el.active)
      if (blockRemove.length === 0) {
        return alert('Выберите блок для удаления')
      }

      const body = {
        blocks: []
      }

      blockRemove.forEach(el => body.blocks.push(el.id))

      const block = new Block()
      block.remove(body)
        .then(res => {
          if (res.ok) {
            console.log(res)
            this.$store.commit('openPopup', 'Блоки удалены')
            this.update()
          } else {
            alert(res.msg())
          }
        })
    },
    edit() {
      const company = new Company();
      company.update(this.company.id, {
        company: {
          name: this.company.name
        }
      }, res => {
        this.update()
      }, err => err)

    },
    update() { update(this) }
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
  grid-gap: .5rem;
}
</style>

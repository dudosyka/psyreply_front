<template>
  <y-modal class="main">
    <template
        v-if="window === 'main'"
    >
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
            :pagination="true"
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
            :pagination="true"
        />
        <y-cool-button @click="addBlocks">Добавить блок в {{ company.name }}</y-cool-button>
      </y-modal>
      <y-modal class="block">
        <header>
          <h2 class="heading">Управление группами компании</h2>
          <y-cool-button @click="addGroup">Добавить группу</y-cool-button>
        </header>
        <y-list
            key-of-name="name"
            :selectable="true"
            :items="company.groups"
            @select="selectGroup"
            :pagination="true"
        />

      </y-modal>
    </template>
    <create-group
        v-if="window === 'createGroup'"
        @close="update"
    >
    </create-group>

    <edit-group
        v-if="window === 'editGroup'"
        @close="update"
    >
    </edit-group>

    <y-modal>
      <header class="header">
        <h2 class="heading">Опасная зона</h2>
      </header>
      <y-cool-button @click="remove">Удалить компанию</y-cool-button>
    </y-modal>

  </y-modal>

</template>

<script>
import Company from '@/api/admin/Company';
import Block from '@/api/admin/Block';
import YCoolButton from '@/components/UI/YCoolButton';
import CreateGroup from "@/components/Group/CreateGroup";
import EditGroup from "@/components/Group/EditGroup";
import mainConf, {ProjectState} from "../../../../main.conf";
import YPopupWarn from "@/components/UI/YPopupWarn.vue";

function update(data) {
  data.window = 'main'
  const company = new Company()
  company.get(data.companyId)
    .then(res => {
      if (res.ok) {
        res.json().then(r => {
          for (let key in r.body) data.company[key] = r.body[key]
        })
      }
    })

  const block = new Block()
  block.getAll({ filters: { "company_id": null }})
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.blocks = r.body)
      }
    })
  block.getAll({ filters: { "company_id": data.companyId }})
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.company.blocks = r.body)
      }
    })
}

export default {
  name: "EditCompany",
  components: {CreateGroup, EditGroup, YCoolButton, YPopupWarn},
  props: {
    companyId: Number
  },
  data() {
    return {
      window: 'main',
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
    addGroup() {
      this.$store.commit('setEditCompany', this.company);
      this.window = 'createGroup';
    },
    selectGroup(n) {
      this.$store.commit('setEditCompany', this.company);
      this.$store.commit('setEditGroup', n);
      this.window = 'editGroup';
    },
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
            if (mainConf.projectState === ProjectState.dev)
              console.log(res)
            this.$store.commit('openPopup', 'Блоки добавлены')
            this.update()
          } else {
            this.$store.commit('openErrorPopup', res.msg())
          }
        })
    },
    removeBlock() {
      const blockRemove = this.company.blocks.filter(el => el.active)
      if (blockRemove.length === 0) {
        this.$store.commit('openErrorPopup', "Для удаления вы должны выбрать хотя бы 1 блок!")
      }

      const body = {
        blocks: []
      }

      blockRemove.forEach(el => body.blocks.push(el.id))

      const block = new Block()
      block.remove(body)
        .then(res => {
          if (res.ok) {
            if (mainConf.projectState === ProjectState.dev)
              console.log(res)
            this.$store.commit('openPopup', 'Блоки удалены')
            this.update()
          } else {
            this.$store.commit('openErrorPopup', res.msg())
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
    remove() {
      this.$store.commit('openWarnPopup', { message: "Вы уверены, что хотите удалить компанию?", acceptCallback: () => {
          const company = new Company()

          company.remove(this.companyId)
              .then(res => {
                if (res.ok) {
                  this.$store.commit('openPopup', "Компания успешно удалена!")
                  this.$emit('close')
                } else {
                  this.$store.commit('openErrorPopup', res.msg)
                }
              })
        }})
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
.modal {
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

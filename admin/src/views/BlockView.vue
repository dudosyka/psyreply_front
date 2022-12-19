<template>
  <div class="wrapper">
    <y-left-side-bar />
    <main class="main">
      <y-modal v-if="window === 'main'" class="main__modal">
        <header class="header">
          <div class="header__select">
            <div class="heading header__heading">Блоки</div>
<!--            <select style="color: white" v-model="filter" @change="updateBlocksList">
              <option style="color: black" :value="null">Без фильтра</option>
              <option style="color: black" v-for="company of companies" :value="company.id">{{company.name}}</option>
            </select>-->
            <y-select
              :selects="companies"
              @select="updateBlocksList"
            />
          </div>
          <y-button :plus="true" @click="this.window ='createBlock'">Новый блок</y-button>
        </header>
<!--        U can add "items" props to list component. It must be array -->
        <y-list
          key-of-name="name"
          :editable="true"
          @edit="editBlock"
          :items="blocks"
        />
      </y-modal>
      <create-block
        v-if="window === 'createBlock'"
        @close="close"
      />
      <edit-block
        :id="editBlockId"
        v-if="window === 'editBlock'"
        @close="close"
      />
    </main>
  </div>
</template>

<script>
import CreateBlock from '@/components/Block/CreateBlock';
import EditBlock from '@/components/Block/EditBlock';

import Block from '@/api/admin/Block';
import Company from '@/api/admin/Company';

function update(data) {
  const block = new Block()
  block.getAll({filters: { company_id: data.filter }})
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.blocks = r)
      }
    })
}

export default {
  name: "BlockView",
  components: {
    CreateBlock, EditBlock
  },
  data() {
    return {
      window: 'main',
      blocks: [],
      editBlockId: null,
      companies: [],
      filter: null
    }
  },
  created() {
    update(this)
    const company = new Company()
    this.companies.push({ })
    this.companies.forEach(el => el['active'] = false)
    this.companies[0]['name'] = 'Шаблоны'
    this.companies[0]['id'] = null
    this.companies[0]['active'] = true
    company.getAllCompanies()
      .then(res => {
        if (res.ok) {
          res.json().then(r => {
            r.forEach(el => {
              el.active = false
              this.companies.push(el)
            })
          })
        }
      })
  },
  methods: {
    editBlock(n){
      this.window = 'editBlock'
      this.editBlockId = n.id
    },
    updateBlocksList(n) {
      this.companies.map(el => {
        el.active = el.id === n.id;
      })
      const select = this.companies.filter(el => el.active)
      this.filter = select[0].id
      update(this)
    },
    close() {
      this.window = 'main'

      this.companies.map(el => el.active = false)
      this.companies.map(el => {
        el.active = el.id === null;
      })
      this.filter = null
      update(this)
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: min-content 1fr;
  width: 100%;
}

.main {
  padding: 4.125rem;
}
.main__modal {
  display: grid;
  grid-gap: 2.5625rem;
}

.header {
  display: grid;
  grid-template-columns: auto min-content;
}
.header__select{
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: left;

}


.header__heading{
  margin-right: 0.5rem;

  font-size:2rem;
}
.header__arrow__button img{
  width: 26px;
  height: 26px;
  margin-right: 20px;
  cursor: pointer;
}

</style>

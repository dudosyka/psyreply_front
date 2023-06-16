<template>
    <y-popup-warn></y-popup-warn>
    <div class="wrapper">
        <y-left-side-bar/>
        <main class="main">
            <y-modal v-if="window === 'main'" class="main__modal">
                <header class="header">
                    <div class="header__select">
                        <div class="row-header">
                            <div class="col-heading">
                                <h2 class="heading header__heading">Блоки</h2>
                            </div>
                            <div class="col-btn">
                                <y-button :plus="true" @click="createBlock">Новый блок</y-button>
                            </div>
                        </div>
                        <!--            <select style="color: white" v-model="filter" @change="updateBlocksList">
                                      <option style="color: black" :value="null">Без фильтра</option>
                                      <option style="color: black" v-for="company of companies" :value="company.id">{{company.name}}</option>
                                    </select>-->
                        <!--            <y-select-->
                        <!--                class="fs-2"-->
                        <!--              :selects="companies"-->
                        <!--              @select="updateBlocksList"-->
                        <!--            />-->
                    </div>

                </header>
                <!--        U can add "items" props to list component. It must be array -->
                <y-list
                        key-of-name="name"
                        :editable="true"
                        @edit="editBlock"
                        :items="blocks"
                        :pagination="true"
                        :pagination-block="true"
                        :page-size="10"
                        :page-num="this.startPage"
                        @clicked="clickTest"
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
import YPopupWarn from "@/components/UI/YPopupWarn";

function update(data) {
  const block = new Block()
  block.getAll({filters: {company_id: data.filter}})
    .then(res => {
      if (res.ok) {
        res.json().then(data => data.body).then(r => {
            data.blocks = r.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
        })
        }
      })
    }


export default {
  name: "BlockView",
  components: {
    YPopupWarn,
    CreateBlock, EditBlock
  },
  data() {
    return {
      window: 'main',
      blocks: [],
      editBlockId: null,
      companies: [],
      filter: null,
      startPage: 0 //страница с которой начинает грузиться раздел
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (toParams.after === '')
          this.window = 'main'
      }
    )
    update(this)
  },
  methods: {
    editBlock(n, data) {
        let page = data.pageNumber

        this.$router.push('/block/edit')
        this.window = 'editBlock'
        this.editBlockId = n.id

        this.$store.commit('pageNumber', page)
    },
    createBlock() {
      this.$router.push('/block/create')
      this.window = 'createBlock'
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
      this.$router.push('/block')
      this.window = 'main'
      this.startPage = this.$store.state.pageNumber
      
      this.companies.map(el => el.active = false)
      this.companies.map(el => {
        el.active = el.id === null;
      })
      this.filter = null
      update(this)
    },
    clickTest() {
        console.log('123');
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
}

.main__modal {
    display: grid;
    width: 70vw;
    grid-gap: 2.5625rem;
}

.header {
    display: grid;
    grid-template-columns: auto min-content;
    max-height: 4rem;
    width: 100%;
}

.header__select {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: left;
    max-height: 4rem;
}


.header__heading {
}

.header__arrow__button img {
    width: 26px;
    height: 26px;
    margin-right: 20px;
    cursor: pointer;
}

.fs-2 {
    font-size: 1.3rem;
}
.row-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.col-btn {
    display: flex;
    width: 100%;
    max-width: 15vw;
    justify-content: flex-end;
}
</style>

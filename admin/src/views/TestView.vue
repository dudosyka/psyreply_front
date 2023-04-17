<template>
    <y-popup-warn></y-popup-warn>
    <div class="wrapper">
        <y-left-side-bar/>
        <main class="main">
            <y-modal v-if="window === 'main'" class="main__modal">
                <header class="header">
                    <div class="header__select">
                        <h2 class="heading header__heading">Тесты</h2>
                        <y-select
                                class="fs-2"
                                :selects="testsCategories"
                                @select="updateTestsList"
                        />
                    </div>
                    <y-button :plus="true" @click="createTest">Новый тест</y-button>
                </header>
                <y-list
                        v-if="tests.length > 0"
                        key-of-name="title"
                        :items="tests"
                        :editable="true"
                        @edit="editTest"
                        :pagination="true"
                        :page-size="10"
                        @clicked="clickTest"
                />
            </y-modal>
            <create-test
                    @close="close('main')"
                    v-if="window === 'createTest'"
            />
            <edit-test
                    @close="close('main')"
                    v-if="window === 'editTest'"
                    :id="editTestId"
            />
        </main>
    </div>
</template>

<script>
import CreateTest from "@/components/Test/CreateTest";
import EditTest from '@/components/Test/EditTest';

import Test from '@/api/admin/Test'
import YPopupWarn from "@/components/UI/YPopupWarn.vue";

function update(data) {
  const test = new Test()
  test.getAll({filters: {}})
    .then(res => {
      if (res.ok) {
        res.json().then(data => data.body).then(r => {
          console.log(r);
          data.tests = r;
          data.testsAll = [...data.tests]
          
          const n = data.testsCategories.filter(el => el.active)[0];
          
          console.log(data.tests);
          console.log(r);
          data.tests = data.testsAll.filter(el => {
            if (n.type == 0)
              return el;
            if (n.type == 1 && el.company_id == null)
              return el;
            if (n.type == 2 && el.company_id != null)
              return el;
          })
        })
      }
    })
  
}

export default {
  name: "TestView",
  components: {
    YPopupWarn,
    CreateTest, EditTest
  },
  data() {
    return {
      window: 'main',
      testsAll: [],
      tests: [],
      testsCategories: [
        {
          type: 0,
          name: "Без фильтра",
          active: true,
        },
        {
          type: 1,
          name: "Общие тесты",
          active: false,
        },
        {
          type: 2,
          name: "Мои тесты",
          active: false,
        }
      ],
      editTestId: null
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
    createTest() {
      this.$router.push('/test/create')
      this.window = 'createTest'
    },
    editTest(n) {
      this.$router.push('/test/edit')
      this.editTestId = n.id
      this.window = 'editTest'
    },
    updateTestsList(n) {
      this.testsCategories = this.testsCategories.map(el => {
        let active = false;
        if (el.type == n.type)
          active = true;
        return {
          ...el,
          active
        }
      })
      this.tests = this.testsAll.filter(el => {
        if (n.type == 0)
          return el;
        if (n.type == 1 && el.company_id == null)
          return el;
        if (n.type == 2 && el.company_id != null)
          return el;
      })
    },
    close(toWindow) {
      this.window = toWindow
      if (toWindow == 'main') {
        this.$router.push('/test')
      }
      this.$store.commit('clearNewTest')
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
}

.header__arrow__button img {
    width: 26px;
    height: 26px;
    margin-right: 20px;
    cursor: pointer;
}

.header__select {
    display: flex;
    align-items: flex-end;
}

</style>

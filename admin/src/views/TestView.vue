<template>
  <div class="wrapper">
    <y-left-side-bar />
    <main class="main">
      <y-modal v-if="window === 'main'" class="main__modal">
        <header class="header">
          <div class="header__select">
            <div class="heading header__heading">Тесты</div>
          </div>
          <y-button :plus="true"  @click="window = 'createTest'">Новый тест</y-button>
        </header>
        <y-list
          v-if="tests.length > 0"
          key-of-name="title"
          :items="tests"
          :editable="true"
          @edit="editTest"
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

function update(data) {
  const test = new Test()
  test.getAll({ filters: {  } })
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.tests = r)
      }
    })
}

export default {
  name: "TestView",
  components: {
    CreateTest, EditTest
  },
  data() {
    return {
      window: 'main',
      tests: [],
      editTestId: null
    }
  },
  created() {
    update(this)
  },
  methods: {
    editTest(n) {
      this.editTestId = n.id
      this.window = 'editTest'
    },
    close(toWindow) {
      this.window = toWindow
      this.$store.commit('clearNewTest')
      update(this)
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
}
.main__modal {
  display: grid;
  grid-gap: 2.5625rem;
}

.header {
  display: grid;
  grid-template-columns: auto min-content;
}
.header__heading {
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

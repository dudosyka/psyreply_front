<template>
  <div class="wrapper">
    <y-left-side-bar />
    <main class="main">
      <y-modal v-if="window === 'main'" class="main__modal">
        <header class="header">
          <div class="header__select">
            <div class="heading header__heading">Компании</div>
          </div>
          <y-button :plus="true" @click="this.window ='createCompany'">Новая компания</y-button>
        </header>
        <!--        U can add "items" props to list component. It must be array -->
        <y-list
          v-if="companies.length > 0"
          :items="companies"
          key-of-name="name"
          :selectable="false"
          :editable="true"
          @edit="editCompany"
        />
      </y-modal>
      <create-company
          v-if="window === 'createCompany'"
          @close="getCompanies"
      />
      <edit-company
        v-if="window === 'editCompany'"
        :companyId="companyId"
        @close="getCompanies"
      />
    </main>
  </div>
</template>

<script>
import CreateBlock from '@/components/Block/CreateBlock';
import EditBlock from '@/components/Block/EditBlock';
import CreateCompany from "@/components/Company/CreateCompany";
import EditCompany from '@/components/Company/EditCompany';
import Company from '@/api/admin/Company';

export default {
  name: "CompanyView",
  components: {
    CreateCompany, EditCompany,
    CreateBlock, EditBlock
  },
  data() {
    return {
      window: 'main',
      companies: [],
      companyId: null
    }
  },
  created() {
    const company = new Company()
    company.getOne()
      .then(res => {
        if (res.ok) {
          res.json().then(r => this.companies = r)
        }
      })
  },
  methods: {
    getCompanies() {
      this.window = 'main'
      const company = new Company()
      company.getOne()
        .then(res => {
          if (res.ok) {
            res.json().then(r => this.companies = r)
          }
        })
    },
    editCompany(n) {
      console.log(n)
      this.companyId = n.id
      this.window = 'editCompany'
    },
    selectHandle(n) {
      console.log(n)
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

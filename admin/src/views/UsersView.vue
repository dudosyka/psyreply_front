<template>
  <y-popup-warn></y-popup-warn>
  <div class="wrapper">
    <y-left-side-bar />
    <main class="main">
      <y-modal class="block" v-if="window === 'main'">
        <header>
          <h2 class="heading">Управление группами компании</h2>
        </header>
        <y-list  v-if="groups.length"
                 key-of-name="name"
                 :selectable="true"
                 :items="groups"
                 @select="selectGroup"
                 :pagination="true"
        />
        <y-cool-button @click="addGroup">Добавить группу</y-cool-button>
      </y-modal>
      <create-group
          v-if="window === 'createGroup'"
          @close="close"
      >
      </create-group>
      <edit-group
          v-if="window === 'editGroup'"
          @close="close"
      >
      </edit-group>
    </main>
  </div>
</template>

<script>
import Company from '@/api/admin/Company';
import YPopupWarn from "@/components/UI/YPopupWarn";
import CreateGroup from "@/components/Group/CreateGroup.vue";
import EditGroup from "@/components/Group/EditGroup.vue";

function update(data) {
}

export default {
  name: "UsersView",
  components: {
    YPopupWarn,
    CreateGroup, EditGroup
  },
  data() {
    return {
      window: 'main',
      groups: []
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

    this.window = 'main';

    const company = new Company();

    company.getGroups().then(r => {
      this.groups = r;
    });
  },
  methods: {
    close() {
      this.$router.push('/users')
      const company = new Company();
      company.getGroups().then(r => {
        this.groups = r;
      });
      this.window = 'main'
    },
    selectGroup() {
      console.log(1111);
    },
    addGroup() {
      this.window = 'createGroup';
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

.fs-2 {
  font-size: 1.3rem;
}

</style>

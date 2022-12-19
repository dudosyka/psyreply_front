<template>
  <header class="header">
    <y-left-arrow-button @click="$emit('close')" />
    <h1>Редактирование группы {{group.name}}</h1>
  </header>
  <y-modal
      class="block"
  >
    <header>
      <h2 class="heading">Основная информация</h2>
    </header>
    <y-input placeholder="Название" v-model.trim="group.name" />
    <y-cool-button @click="addUsers">Сохранить</y-cool-button>
  </y-modal>
  <y-modal
      class="block"
  >
    <header>
      <h2 class="heading">Пользователи в группе</h2>
    </header>
    <y-list
        :items="group.users"
        key-of-name="login"
        show-id="jetBotId"
        :selectable="true"
        @select="selectUser"
    />
    <y-cool-button v-if="group.users.length > 1" @click="deleteFromGroup">Удалить выбранных из группы</y-cool-button>
  </y-modal>
  <y-modal
      class="block"
  >
    <header>
      <h2 class="heading">Добавление пользователей в группу</h2>
    </header>
    <y-list
        :items="users"
        key-of-name="login"
        show-id="jetBotId"
        :selectable="true"
        @select="selectUser"
    />
    <y-cool-button v-if="users.length > 1" @click="addUsers">Добавить</y-cool-button>
  </y-modal>
  <y-cool-button @click="remove">Удалить</y-cool-button>
</template>

<script>
import User from "@/api/admin/User";
import Group from "@/api/admin/Group";
import Company from "@/api/admin/Company";

export default {
  name: "EditGroup",
  data() {
    return {
      company: {},
      group: {},
      users: [],
      inGroupUsers: []
    }
  },
  async created() {
    await this.update();
  },
  methods: {
    async update() {
      this.company = this.$store.state.company;
      this.group = this.$store.state.group;

      const user = new User();

      this.users = (await user.getAll({
        except_group_id: this.group.id
      })).map(el => {
        el.active = false;
        return el;
      });
      this.group.users = this.group.users.map(el => {
        el.active = false;
        return el;
      })
    },
    selectUser(n) {
      n.active = !n.active;
    },
    deleteFromGroup() {
      const group = new Group();
      const users = this.group.users.filter(el => el.active).map(el => el.id);
      console.log(this.group.id, users);
      group.removeUsers(this.group.id, users).then(res => {
        const company = new Company();
        company.get(this.company.id, res => res.json()).then(company => {
          this.$store.commit('setEditCompany', company);
          this.$store.commit('setEditGroup', company.groups.filter(el => el.id == this.group.id)[0])
          this.update();
        })
      });
    },
    addUsers() {
      const group = new Group();
      const users = this.users.filter(el => el.active).map(el => parseInt(el.id));
      console.log(this.group.id, users)
      group.update(this.group.id, {
        name: this.group.name,
        users
      }).then(res => {
        const company = new Company();
        company.get(this.company.id, res => res.json()).then(company => {
          this.$store.commit('setEditCompany', company);
          this.$store.commit('setEditGroup', company.groups.filter(el => el.id == this.group.id)[0])
          this.update();
        })
      });
    },
    remove() {
      const group = new Group();
      group.remove(this.group.id).then(res => {
        const company = new Company();
        company.get(this.company.id, res => res.json()).then(company => {
          this.$store.commit('setEditCompany', company);
          this.$store.commit('setEditGroup', null)
          this.$emit('close');
        })
      })
    }
  }
}
</script>

<style scoped>
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

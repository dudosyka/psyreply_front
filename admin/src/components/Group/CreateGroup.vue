<template>
  <header class="header">
    <y-left-arrow-button @click="$emit('close')" />
    <h1>Создание новой группы в {{company.name}}</h1>
  </header>
  <y-modal
    class="block"
  >
    <header>
      <h2 class="heading">Основная информация</h2>
    </header>
    <y-input placeholder="Название" v-model.trim="group.name" />
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
  </y-modal>
  <y-cool-button @click="create">Сохранить</y-cool-button>
</template>

<script>
import User from "@/api/admin/User";
import Group from "@/api/admin/Group";

export default {
  name: "CreateGroup",
  data() {
    return {
      company: {},
      group: {
        name: "",
        users: []
      },
      users: []
    }
  },
  async created() {
    console.log(this.$store.state.company.name);
    this.company = this.$store.state.company;

    const user = new User();
    this.users = (await user.getAll({
      except_company_id: this.company.id
    })).map(el => {
      el.active = false;
      return el;
    });
    // console.log(this.users[0]);
  },
  methods: {
    selectUser(n) {
      n.active = !n.active;
    },
    create() {
      const group = new Group();
      this.group.users = this.users.filter(el => el.active).map(el => parseInt(el.id));
      group.create(this.company.id, this.group).then(res => {
        this.$emit('close');
      });
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

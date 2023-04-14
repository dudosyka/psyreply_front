<template>

    <y-modal
            class="block"
    >
        <header class="header">
            <y-left-arrow-button @click="$emit('close')"/>
            <h2>Создание новой группы</h2>
        </header>
        <header class="header">
            <h3 class="heading">Основная информация</h3>
        </header>
        <y-input placeholder="Название" v-model.trim="group.name"/>
        <header class="header">
            <h3 class="heading">Добавление пользователей в группу</h3>
        </header>
        <y-list
                :items="users"
                key-of-name="login"
                show-id="jetBotId"
                :selectable="true"
                @select="selectUser"
        />
        <y-cool-button @click="create">Сохранить</y-cool-button>
    </y-modal>

</template>

<script>
import User from "@/api/admin/User";
import Group from "@/api/admin/Group";
import mainConf, {ProjectState} from "../../../../main.conf";

export default {
  name: "CreateGroup",
  data() {
    return {
      group: {
        name: "",
        users: []
      },
      users: []
    }
  },
  async created() {
    if (mainConf.projectState === ProjectState.dev)
      console.log(this.$store.state.company.name);
    
    const user = new User();
    this.users = (await user.getAll({
      byCompany: true,
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
      console.log('clicked');
      const group = new Group();
      this.group.users = this.users.filter(el => el.active).map(el => parseInt(el.id));
      group.create(this.group).then(res => {
        console.log(res)
        this.$emit('close');
      });
    }
  }
}
</script>

<style scoped>
.header {
    display: flex;
    grid-template-columns: auto max-content;
    justify-content: flex-start;
    grid-gap: 1rem;
    align-items: center;
    border-bottom: 1px solid var(--border-dark);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}

.input {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.input:hover {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}
</style>

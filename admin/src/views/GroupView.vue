<template>
  <main class="main">
    <y-modal v-if="window === 'main'" class="main__modal">
      <div class="container-fluid main-container">
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
        <create-group
          v-if="window === 'createGroup'"
          @close="close"
      />
        <edit-group
            :id="editBlockId"
            v-if="window === 'editGroup'"
            @close="close"
        />
      </div>
    </y-modal>

  </main>
</template>

<script>
import EditGroup from "@/components/Group/EditGroup";
import CreateGroup from "@/components/Group/CreateGroup";

export default {
  name: "GroupView",
  components: [ EditGroup, CreateGroup ]
}
</script>

<style scoped>
.main-container {
  width: 70vw;
  display: flex;
  gap: 6rem;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
}у
.main__modal {
  align-items: center;
  display: flex;
  width: 90vw;
  grid-gap: 2.5625rem;
  flex-direction: row;
  padding-right: 3rem;
}
</style>

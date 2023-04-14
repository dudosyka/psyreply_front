<template>
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
        <create-group
                v-if="window === 'createGroup'"
                @close="close"
        />
        <edit-group
                :id="editBlockId"
                v-if="window === 'editGroup'"
                @close="close"
        />
    </main>
</template>

<script>
import EditGroup from "@/components/Group/EditGroup";
import CreateGroup from "@/components/Group/CreateGroup";

export default {
  name: "GroupView",
  components: [EditGroup, CreateGroup]
}
</script>

<style scoped>

</style>

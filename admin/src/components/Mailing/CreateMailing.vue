<template>
  <y-modal class="modal" v-if="window === 'main'">
      <header class="header">
        <!--
          Если будешь заменять эту кнопку то не забудь в том элементе, на который заменишь, прописать точно такой же @click
          Подробнее см. пояснение внутри MailingView в методе close
        -->
        <y-left-arrow-button @click="$emit('close')" />
        <h1 class="heading">Новая рассылка</h1>

        <div class="col time">
          <h5>Время рассылки: </h5>
          <y-input max="24" min="0" type="number" v-model="time.hours" placeholder="чч" class="time-picker__input"/>:
          <y-input max="59" min="0" type="number" v-model="time.minutes" placeholder="мм" class="time-picker__input"/>:
        </div>

        <y-button class="new-button" @click="openCreateBlock" :plus="true">Добавить блок</y-button>

      </header>
      <y-input
              v-model="name"
          placeholder="Название рассылки"
      />
    <h5 class="heading-small">Периодичность</h5>
    <y-modal class="time-picker">
      <div class="col">
        <y-cool-button v-if="!one_time" @click="selectIsOneTime(true)" class="element-btn" ><i class="fa-solid fa-arrow-right-long"></i> Разовая</y-cool-button>
        <y-cool-button v-else @click="selectIsOneTime(false)" class="element-btn" ><i class="fa-solid fa-arrows-rotate"></i> Многоразовая</y-cool-button>
      </div>
        <template v-if="!one_time">
            <div class="col">
                <y-cool-button class="element-btn" @click="setPeriod(1)" :class="{'active-element-btn': day_period == 1}" >Каждый день</y-cool-button>
                <y-cool-button class="element-btn" @click="setPeriod(7)" :class="{'active-element-btn': day_period == 7}" >Каждую неделю</y-cool-button>
                <y-cool-button class="element-btn" @click="setPeriod(30)" :class="{'active-element-btn': day_period == 30}" >Каждые 30 дней</y-cool-button>
                <y-cool-button class="element-btn" @click="setPeriod(day_period_input)" :class="{'active-element-btn': showCustomPeriod}" >Своя</y-cool-button>
            </div>
            <div v-if="showCustomPeriod" class="col custom-day">
                <h5>Периодичность (в днях)</h5>
                <y-input  class="day" v-model.number="day_period_input" @change="setPeriod(day_period_input)"></y-input>
            </div>
        </template>
    </y-modal>
    <h5 class="heading-small">Адресаты</h5>
    <div class="container-fluid contacts">
      <div class="col groups">
        <h5>Группы</h5>
        <div class="container">
          <y-list
          :items="groups"
          key-of-name="name"
          :editable="true"
          @edit="showedPeople"
          :selectable="true"
          @select="selectGroup"
          :pagination="true"
          :page-size="6"
          ></y-list>
        </div>
<!--        <div class="container-fluid footer-container">-->
<!--          <YButton @click="previousPage" :class="{'hide-pagination': !showPrev}" class="prev"><i class="fa-solid fa-chevron-left"></i> Назад</YButton>-->
<!--          <YButton @click="nextPage" :class="{'hide-pagination': !showNext}" class="next">Далее <i class="fa-solid fa-chevron-right"></i></YButton>-->
<!--        </div>-->

      </div>

      <div class="col people">
        <h5>Люди</h5>
        <div class="container">
          <y-list
              :items="peopleInGroup"
              key-of-name="login"
              :selectable="true"
              @select="selectPerson"
              :pagination="true"
              :page-size="6">
          </y-list>
        </div>
        <div class="container-fluid footer-container">
<!--          <YButton @click="previousPage" :class="{'hide-pagination': !showPrev}" class="prev"><i class="fa-solid fa-chevron-left"></i> Назад</YButton>-->
<!--          <YButton @click="nextPage" :class="{'hide-pagination': !showNext}" class="next">Далее <i class="fa-solid fa-chevron-right"></i></YButton>-->
        </div>
      </div>
    </div>
    <h5 class="heading-small">Блоки рассылок</h5>
      <y-list
        :items="blocks"
        key-of-name="name"
        :selectable="false"
        :editable="true"
        @edit="selectBlock"
        :pagination="true"
        :page-size="5"
      ></y-list>
<!--    <div class="container-fluid footer-container">-->
<!--      <YButton @click="previousPage" :class="{'hide-pagination': !showPrev}" class="prev"><i class="fa-solid fa-chevron-left"></i> Назад</YButton>-->
<!--      <YButton @click="nextPage" :class="{'hide-pagination': !showNext}" class="next">Далее <i class="fa-solid fa-chevron-right"></i></YButton>-->
<!--    </div>-->
    <div class="row button-row">
      <y-cool-button @click="testing">Сохранить рассылку</y-cool-button>
    </div>
  </y-modal>
  <CreateMailingBlock
      v-if="window === 'createBlock'"
      @close="window = 'main'"
  >

  </CreateMailingBlock>
</template>

<script>
import CreateMailingBlock from "@/components/Mailing/CreateMailingBlock.vue";
import YModal from "@/components/UI/YModal.vue";
import User from "@/api/admin/User";
import Company from "@/api/admin/Company";

export default {
  name: "CreateMailing",
  components: {
    YModal,
    CreateMailingBlock,
  },
  emits: ['close'],
  data() {
    return {
        name: "",
        one_time: true,
        day_period: 1,
        day_period_input: null,
        groups: [],
        peopleInGroup: [],
        allPeople: [],
      time: {
        hours: null,
        minutes: null
      },
      window: 'main',
    }
  },
  created() {
    //создание списка групп
    const company = new Company()
    company.getGroups().then(r => {
      this.groups = r.map(el => ({ ...el, active: false }));
    });
    company.getAllUsers().then(r => {
      this.allPeople = r.map(el => ({ ...el, active: false }));
    });
  },
  methods: {
    testing(){
      console.log(this.time.hours,this.time.minutes,this.name,this.day_period)
      console.log(this.groups)
      console.log(this.peopleInGroup)
      console.log(this.allPeople)
      console.log('dsdfsdf',this.allPeople.filter(el => el.active).map(el => el.id))
    },
    showedPeople(group){
      this.peopleInGroup = this.allPeople
      this.peopleInGroup = this.allPeople.filter(el=>(el.group_id == group.id))//понять как подставить id группы
      console.log("люди вывелись")

    },
    selectGroup(group){
      console.log("группа выбралась")
      group.active = !group.active

    },
    selectPerson(user){
      console.log("чувак выбран")
      user.active = !user.active;
      //this.allPeople.filter(el => el.active).map(el => el.id)
    },
    async openCreateBlock() {
      const index = await this.$store.dispatch('createNewDistributionBlock');
      this.$store.dispatch('selectDistributionBlock', index);
      this.window = 'createBlock'
    },
    selectIsOneTime(isOneTime) {
      this.one_time = isOneTime;
    },
    setPeriod(period) {
      console.log(period);
      this.day_period = period;
    },
    selectBlock(item) {
      this.$store.dispatch('selectDistributionBlock', item.index);
      this.window = 'createBlock';
    }
  },
  computed: {
    showCustomPeriod() {
      return this.day_period != 1 && this.day_period != 7 && this.day_period != 30
    },
    blocks() {
      const blocks = this.$store.getters.distributionBlocks;
      console.log(blocks);
      return blocks;
    }
  }
}
</script>

<style scoped>
.button-row {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  padding-top: 1rem;
  margin-top: 1rem;
}
.groups {
  width: 30vw!important;
}
.people {
  width: 30vw!important;
}
.contacts {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
}
.day {
  max-width: 3vw;
}
.custom-day {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.element-btn {
  max-width: 15vw;
  width: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  background: transparent!important;
  border: 1px solid var(--border-dark);
}
.active-element-btn {
    background: #8419a1!important;
    border: 1px solid var(--border-dark);
    border-radius: 0.5rem;
    color: white;
}
.element-btn:hover {
  max-width: 15vw;
  padding-right: 1rem;
  padding-left: 1rem;
  width: auto;
  background: #8419a1!important;
  border: 1px solid rgba(255, 255, 255, 0.56);
}
.header {
  display: flex;
  grid-template-columns: auto min-content;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.new-button {
  width: 10vw;
}
.modal {
  display: grid;
  width: 70vw;
  grid-gap: 2.5625rem;
  background: rgba(7, 18, 25, 0.75);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  padding: 3.0625rem 3.0625rem 3.0625rem;
  box-shadow: 0 4px 52px hsl(274deg 100% 50% / 11%);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  gap: 1rem;
  flex-direction: column;
  align-items: center;
}
.time-picker {
  gap: 2rem;
  font-size: 1rem;
  padding: 0.4rem;
  width: 64.5vw;
  display: flex;
  border-radius: 0.3rem;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.input {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  text-align: left;
  padding-left: 1rem!important;
  height: 2rem;
}
.input:hover {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  text-align: left;
  padding-left: 1rem!important;
  height: 2rem;
}
.time-picker__input {
  padding: .1rem;
}
.time {
  display: flex;
  align-items: center;
  width:  35vw;
}
</style>

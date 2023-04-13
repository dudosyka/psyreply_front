<template>
  <y-popup-warn></y-popup-warn>
  <div class="wrapper">
    <y-left-side-bar />
    <main class="main">
      <!--
        Внутри этого template должна быть верстка касающаяся дефолт вида окна рассылок
        Тут должен быть список рассылок см. листочек с обсуждения
      -->
      <template v-if="window === 'main'" >
        <div class="container main-container">
          <template
            v-if="isBotSet"
          >
              <header class="row header">
                  <div class="col">
                      <h2 class="heading header__heading">Рассылки</h2>
                  </div>
                  <div class="col header-buttons">
                      <y-button class="new-button"><i class="fa-brands fa-telegram"></i> Telegram Bot</y-button>
                      <y-button class="new-button" :plus="true" @click="createMailing">Новая рассылка</y-button>
                  </div>
              </header>
              <y-list
                      key-of-name="name"
                      :editable="true"
                      @edit="editMailing"
                      :items="mailings"
                      :pagination="true"
                      :pagination-block="true"
                      :page-size="4"
              />
          </template>
          <div v-else class="tg-add">
                <header class="row header">
                    <div class="col">
                        <h2 class="heading header__heading">Привязка Telegram</h2>
                    </div>
                </header>
                <h4 class="heading-small">Название</h4>
                <y-input class="name" placeholder="Введите название..."></y-input>
                <h4 class="heading-small">Токен</h4>
                <y-input class="token" placeholder="Введите токен..."></y-input>
                <p class="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque autem consequuntur debitis dicta
                    dolores harum ipsa magnam magni nemo perspiciatis, placeat quas quo, quod reiciendis repudiandae saepe?
                    Nobis, repellat.</p>
                <div class="btn-row">
                    <y-button class="element-btn element-btn-active">Сохранить</y-button>
                </div>
            </div>
        </div>
      </template>

      <!--
        Внутри этого template можно делать верстку касающуюся момента
        когда мы впервые сюда зашли и хотим привязать бота.
      -->
      <template v-if="window === 'createBot'">
        <CreateMailingBot></CreateMailingBot>
      </template>

      <!--
        Внутри этого template можно делать верстку касающуюся
        создания новой рассылки

        Можешь как они сделать отдельный компонент, можешь прямо тут просто внутри template накидать всё
      -->
      <template v-if="window === 'createMailing'">
        <create-mailing
            @close="close"
        />
      </template>

      <!--
        Внутри этого template можно делать верстку касающуюся
        редактирования существующей рассылки

        Логика та же: либо отдельный компонент, либо прям тут
      -->
      <template v-if="window === 'editMailing'">
        <edit-mailing
            :id="selectedDistribution.id"
            @close="close"
        />
      </template>

    </main>
  </div>
</template>

<script>
import YPopupWarn from "@/components/UI/YPopupWarn";
import CreateMailing from "@/components/Mailing/CreateMailing.vue";
import EditMailing from "@/components/Mailing/EditMailing.vue";
import CreateMailingBot from "@/components/Mailing/CreateMailingBot.vue";
import YButton from "@/components/UI/YButton.vue";
import {BotModel} from "@/api/admin/distribution/Bot";
import {Distribution} from "@/api/admin/distribution/Distribution";
import Company from "@/api/admin/Company";

export default {
  name: "MailingView",
  components: {
    YButton,
    CreateMailingBot,
    EditMailing,
    CreateMailing,
    YPopupWarn,
  },
  data() {
    return {
      window: 'main',
        showBotWindow: null,
    }
  },
  async created() {
      await this.$store.dispatch('loadDistributions');
    // Вот эта тема должна следить за изменениями url и на основе этого типо изменять контент
    // Я эту штуку отключаю, можешь просто руками задать соответствующий window который тебе нужен в данный момент
    // Вот список значений window
    // main - дефолт страница (список рассылок)
    // createBot - Создание бота (первый вход)
    // createMailing - Создание рассылок
    // editMailing - Редактирование рассылок
    this.window = 'main';
    // this.$watch(
    //     () => this.$route.params,
    //     (toParams, previousParams) => {
    //       if (toParams.after === '')
    //         this.window = 'main'
    //     }
    // )
  },
  methods: {
    close() {
      this.window = 'main';
    },
    async editMailing(item) {
      await this.$store.dispatch('selectDistribution', item.id);
      this.window = 'createMailing';
    },
    async createMailing() {
      await this.$store.dispatch('createNewDistribution');
      this.window = 'createMailing'
    }
  },
  computed: {
      isBotSet() {
          return this.$store.getters.isBotSet;
      },
      mailings() {
          return this.$store.getters.distributionList;
      },
      selectedDistribution() {
          return this.$store.getters.selectedDistribution;
      }
  },
}
</script>

<style scoped>
/*Активная кнопка*/
.element-btn-active {
  max-width: 15vw;
  background: #8419a1;
  border: 1px solid var(--border-dark);
  padding: 0.3rem;
  border-radius: 0.5rem;
  color: white;
}
/*-------------*/
/*Стили для TGBot*/
.btn-row {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.element-btn {
  max-width: 15vw;
  background: transparent!important;
  border: 1px solid var(--border-dark);
  padding: 0.3rem;
  border-radius: 0.5rem;
  color: white;
}
.element-btn:hover {
  max-width: 15vw;
  background: #8419a1 !important;
  border: 1px solid var(--border-dark);
  padding: 0.3rem;
  border-radius: 0.5rem;
  color: white;
}
.info {
  font-size: 0.9rem;
  margin-top: 1rem;
}
.heading-small {
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.name {
  width: 63vw;
}
.token {
  width: 63vw;
}
/*-------------*/
.header {
  display: flex;
  grid-template-columns: auto min-content;
  flex-direction: row;
  justify-content: space-between;
}
.new-button {
  width: 10vw;
}
.main-container {
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

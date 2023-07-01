<template>
    <y-popup-warn></y-popup-warn>
    <div class="wrapper">
        <y-left-side-bar/>
        <main class="main">
            <!--
              Внутри этого template должна быть верстка касающаяся дефолт вида окна рассылок
              Тут должен быть список рассылок см. листочек с обсуждения
            -->
            <template v-if="window === 'main' || window === 'bot-edit'">
                <div class="container main-container">
                    <template
                            v-if="isBotSet !== false && window != 'bot-edit'"
                    >
                        <header class="row header">
                            <div class="col">
                                <h2 class="heading header__heading">Рассылки</h2>
                            </div>
                            <div class="col header-buttons">
                                <y-button @click="editBot('bot-edit')" class="new-button"><i
                                        class="fa-brands fa-telegram"></i> Telegram Bot
                                </y-button>
                                <y-button class="new-button" :plus="true" @click="createMailing">Новая рассылка
                                </y-button>
                            </div>
                        </header>
                        <y-list
                                key-of-name="name"
                                :editable="true"
                                @edit="editMailing"
                                :items="mailings"
                                :pagination="true"
                                :pagination-block="true"
                                :page-size="10"
                                :deletable="true"
                                @delete="deleteDistribution"
                        />
                    </template>
                    <div v-if="window == 'bot-edit'" class="tg-add">
                        <header class="row header">
                            <div class="col">
                                <h2 class="heading header__heading">Привязка Telegram</h2>
                            </div>
                        </header>
                        <h4 class="heading-small">Название</h4>
                        <y-input v-model="botName" class="name" placeholder="Введите название..."></y-input>
                        <h4 class="heading-small">Токен</h4>
                        <y-input v-model="botToken" class="token" placeholder="Введите токен..."></y-input>

                        <div class="container elements">
                        <h3 class="add-heading">Добавление элементов</h3>
                        <y-cool-button class="element-btn element-btn-active">
                          <i class="fa-solid fa-text-width"></i> Текст
                        </y-cool-button>
                        <y-cool-button class="element-btn element-btn-active">
                          <i class="fa-solid fa-newspaper"></i> Медиа
                        </y-cool-button>
                        <y-cool-button class="element-btn element-btn-active">
                          <i class="fa-solid fa-link"></i> Ссылка
                        </y-cool-button>
                        <y-cool-button class="element-btn element-btn-active">
                          <i class="fa-solid fa-list"></i> Тест
                        </y-cool-button>
                        <!--      <y-cool-button  class="element-btn element-btn-active" @click="createElement(5)"><i class="fa-solid fa-route"></i> Навигация</y-cool-button>-->
                      </div>

                        <div class="element text">
                        <h4 class="element-heading">Текст</h4>
                        <textarea  class="text-area"></textarea>
                        <div class="row button-row">
                          <y-cool-button @click="removeElement(index)"
                                         class="element-btn element-delete element-delete-active"><i
                              class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                          </y-cool-button>
                        </div>
                      </div>

                        <div class="element text-img">
                        <h4 class="element-heading">Медиа</h4>
                        <div class="row media-row">
                            <input type="file" id="img" style="display:none;">
                            <label class="upload-text" for="img"><i class="fa-solid fa-file"></i> Выберите файл</label>
                          <div class="attached-file">
                            <span class="file-name"></span><i class="delete-file fa-solid fa-circle-xmark"></i>
                          </div>
                          <y-cool-button class="element-btn element-btn-active">
                            <i class="fa-solid fa-pen"></i> Подпись
                          </y-cool-button>
                        </div>
                          <h5 class="heading-small">Подпись</h5>
                          <textarea @change="dropValidation(element)" class="text-area"></textarea>
                        <div class="row button-row">
                          <y-cool-button @click="removeElement(index)"
                                         class="element-btn element-delete element-delete-active"><i
                              class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                          </y-cool-button>
                        </div>
                      </div>

                        <div class="element button-element">
                        <h4 class="element-heading">Ссылка</h4>
                        <h5 class="heading-small">Подпись</h5>
                        <textarea  class="text-area" ></textarea>
                        <h5 class="heading-small">Текст кнопки</h5>
                        <y-input class="button-text"/>
                        <h5 class="heading-small">URL</h5>
                        <y-input class="button-text" placeholder="Адрес ссылки"/>
                        <div class="row button-row">
                          <y-cool-button
                                         class="element-btn element-delete element-delete-active"><i
                              class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                          </y-cool-button>
                        </div>
                      </div>

                        <div class="element test-element">
                        <h4 class="element-heading test">Тест</h4>
                        <h5 class="heading-small">Привязать блок тестов</h5>
                        <div class="container tests">
                          <y-list
                          />
                        </div>
                        <h5 class="heading-small">Подпись</h5>
                        <textarea class="text-area"></textarea>
                        <h5 class="heading-small">Текст кнопки</h5>
                        <y-input class="button-text"/>
                        <div class="row button-row">
                          <y-cool-button class="element-btn element-delete"><i
                              class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                          </y-cool-button>
                        </div>
                      </div>

                        <div class="btn-row">
                            <y-button class="element-btn element-btn-active" @click="saveBot">Сохранить</y-button>
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
import {Distribution} from "@/api/admin/distribution/Distribution";
import {CompanyDistribution} from "@/api/admin/distribution/CompanyDistribution";

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
      botName: "",
      botToken: "",
    }
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (toParams.after === '')
          this.window = 'main'
      }
    )
    await this.$store.dispatch('loadDistributions');
    this.window = 'main';
    
    if (this.isBotSet !== false) {
      this.botName = this.isBotSet.name;
      this.botToken = this.isBotSet.token;
    } else {
      this.window = 'bot-edit';
    }
    // Вот эта тема должна следить за изменениями url и на основе этого типо изменять контент
    // Я эту штуку отключаю, можешь просто руками задать соответствующий window который тебе нужен в данный момент
    // Вот список значений window
    // main - дефолт страница (список рассылок)
    // createBot - Создание бота (первый вход)
    // createMailing - Создание рассылок
    // editMailing - Редактирование рассылок
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
      this.$router.push('/distribution')
      this.window = 'main';
    },
    async editMailing(item) {
      await this.$store.dispatch('selectDistribution', item.id);
      this.$router.push('/distribution/update')
      this.window = 'createMailing';
    },
    async createMailing() {
      await this.$store.dispatch('createNewDistribution');
      this.$router.push('/distribution/create')
      this.window = 'createMailing'
    },
    async deleteDistribution(distribution) {
      const model = new Distribution();
      this.$store.commit('openWarnPopup', {
        message: "Вы уверены, что хотите удалить рассылку?",
        acceptCallback: () => {
          model.remove(distribution.id).then(() => {
            this.$store.dispatch('loadDistributions');
          });
        }
      });
    },
    editBot(route) {
      this.$router.push('/distribution/bot/edit')
      this.window = route;
    },
    async saveBot() {
      const companyDistribution = new CompanyDistribution();
      if (this.isBotSet !== false) {
        await companyDistribution.updateBot({
          name: this.botName,
          token: this.botToken,
          id: this.isBotSet.id
        }).then(() => {
          this.$store.commit('openPopup', 'Данные сохранены!');
          this.window = 'main';
        }).catch(err => {
          console.log(err);
          this.$store.commit('openErrorPopup', 'Ошибка в сохранении!');
        })
      } else {
        await companyDistribution.createBot({name: this.botName, token: this.botToken}).then(() => {
          this.$store.commit('openPopup', 'Данные сохранены!');
          this.$store.dispatch('loadDistributions').finally(() => {
            this.window = 'main';
          });
        }).catch(err => {
          console.log(err);
          this.$store.commit('openErrorPopup', 'Ошибка в сохранении!');
        })
      }
    },
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
.attached-files {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  max-width: 60vw;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.attached-file {
  background: rgba(255, 255, 255, 0.18);
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  min-width: 10vw;
  max-width: max-content;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-direction: row;
}
.file-name {
  margin-right: 1rem;
}
.delete-file {
  font-size: 0.8rem;
}
.delete-file:hover {
  color: #ff0059;
  transition: 0.3s;
}
/*Активные кнопки*/
.element-delete-active {
  background: rgba(233, 67, 97, 0.66) !important;
}

.element-btn-active {
  max-width: 15vw;
  background: #8419a1;
  border: 1px solid var(--border-dark);
  padding: 0.3rem;
  border-radius: 0.5rem;
  color: white;
}

/*-------------*/
.tests {
  margin-top: 1rem !important;
  padding-bottom: 1rem;
}

.footer-container {
  margin-top: 1rem;
}

.elements {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.heading-small {
  margin-top: 1rem;
}

.media-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.add-heading {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.new-element-row {
  display: flex;
  justify-content: center;
}

.element-btn {
  max-width: 15vw;
  background: transparent !important;
  border: 1px solid var(--border-dark);
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

.element-btn:hover {
  max-width: 15vw;
  background: transparent !important;
  border: 1px solid var(--border-dark);
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

.element-save:hover {
  background: rgba(67, 233, 123, 0.66) !important;
}

.element-delete:hover {
  background: rgba(233, 67, 97, 0.66) !important;
}

.button-row {
  border-bottom: 1px solid var(--border-dark);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.button-row:last-child {
  border: none;
}

.upload-text {
  margin-bottom: 1rem !important;
}

.element-heading {
  margin-bottom: 1rem;
}

.header {
  display: flex;
  grid-template-columns: auto min-content;
  flex-direction: row;
  justify-content: flex-start;
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

.input {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  text-align: left;
  padding-left: 1rem !important;
  height: 2rem;
}

.heading {
  padding-left: 1rem;
}

.input:hover {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  text-align: left;
  padding-left: 1rem !important;
  height: 2rem;
}

.text-area {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: #ffffffab;
  width: 63vw;
  max-width: 63vw;
  min-height: 20vh;
  overflow-y: scroll;
  padding: 2rem;
  margin-top: 1rem;
}

.text-area:focus-visible {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.125) !important;
  color: white;
  width: 63vw;
  max-width: 63vw;
  min-height: 20vh;
  overflow-y: scroll;
  padding: 2rem;
}

.text-area:focus {
  background: rgba(7, 18, 25, 0.75);
  border-radius: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.125) !important;
  color: white;
  width: 63vw;
  max-width: 63vw;
  min-height: 20vh;
  overflow-y: scroll;
  padding: 2rem;
}

.button-text {
  margin-top: 1rem;
  width: 63vw;
}

textarea::-webkit-scrollbar-track {
  width: 4px !important;
}

textarea::-webkit-scrollbar-track {
  background: #d5d2d2 !important;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #7e7c7e !important;
  border-radius: 10px !important;
  border: 3px solid #7e7c7e !important;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: #494849 !important;
}
.error-input {
  border-color: #500000;
  color: #ff7d7d;
}
.error-input::placeholder {
  color: #ff7d7d;
}


/*Активная кнопка*/
.element-btn-active {
    max-width: 10vw;
    width: 100%;
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
    max-width: 10vw;
    width: 100%;
    background: transparent !important;
    border: 1px solid var(--border-dark);
    padding: 0.3rem;
    border-radius: 0.5rem;
    color: white;
}

.element-btn:hover {
    max-width: 10vw;
    width: 100%;
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
    width: 100%;
    max-width: 14vw;
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

.header__select {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: left;

}


.header__heading {
    margin-right: 0.5rem;

    font-size: 2rem;
}

.header__arrow__button img {
    width: 26px;
    height: 26px;
    margin-right: 20px;
    cursor: pointer;
}

.fs-2 {
    font-size: 1.3rem;
}
.header-buttons {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
}
</style>

<template>
  <y-popup-warn></y-popup-warn>
  <div class="wrapper">

    <main class="main">
      <y-modal v-if="window === 'main'" class="main__modal">

      <!--
        Внутри этого template должна быть верстка касающаяся дефолт вида окна рассылок
        Тут должен быть список рассылок см. листочек с обсуждения
      -->
        <div class="container-fluid main-container">
          <template v-if="window === 'main'" >
            <header class="header">
              <div class="row header-row">
                <div class="col heading-col">
                  <h2 class="heading header__heading">Рассылки</h2>
                </div>
                <div class="col buttons-col">
                  <y-button class="telegram"><i class="fa-brands fa-telegram"></i> Telegram Bot</y-button>
                  <y-button :plus="true" @click="createMailing" class="create-mailing">Новая рассылка</y-button>
                </div>
              </div>
            </header>
            <y-list
                key-of-name="name"
                :editable="true"
                @edit="editBlock"
                :items="mailings"
            />
            <div class="container-fluid footer-container">
              <YButton @click="previousPage" :class="{'hide-pagination': !showPrev}" class="prev"><i class="fa-solid fa-chevron-left"></i> Назад</YButton>
              <YButton @click="nextPage" :class="{'hide-pagination': !showNext}" class="next">Далее <i class="fa-solid fa-chevron-right"></i></YButton>
            </div>
          </template>
        </div>


      <!--
        Внутри этого template можно делать верстку касающуюся момента
        когда мы впервые сюда зашли и хотим привязать бота.
      -->
      <template v-if="window === 'createBot'">
        <CreateMailingBot></CreateMailingBot>
      </template>
        </y-modal>
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
            :id="2"
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
      mailings: ["1", "2", "3", "4", "5"],
    }
  },
  created() {
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
    // Этот метод обрабатывает закрытие Мишиных компонентов
    // Он будет открывать дефолт окно при закрытии одного из них
    // Для того чтобы он работал в компоненте, должен быть какой то элемент
    // В котором задан клик @click="$emit('close')"
    // А в вызове компонента надо прописать @close='close'
    // см. Как это работает в Мишиных компонентах
    // Если хочешь можешь также сделать в своих ну или просто всегда руками меняй window внутри created
    close() {
      this.window = 'main';
    },
    createMailing() {
      this.window = 'createMailing'
      this.window = 'createMailing'
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 70vw;
  display: flex;
  padding-right: 1rem;
  gap: 3rem;
  max-height: 60vh;
  overflow-y: scroll;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.footer-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.13);
  padding-top: 1rem;
}
.hide-pagination {
  color: white!important;
  opacity: 0.2;
}
.telegram {
  width: 9vw;
  border: 1px solid var(--border-dark);
  border-radius: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.telegram:hover {
  width: 9vw;
  border: 1px solid rgba(255, 255, 255, 0.37);
  border-radius: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.create-mailing {
  width: 10vw;
  border: 1px solid var(--border-dark);
  border-radius: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.create-mailing:hover {
  width: 10vw;
  border: 1px solid rgba(255, 255, 255, 0.37);
  border-radius: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.header-row {
  display: flex;
  justify-content: space-between;
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
  align-items: center;
  display: flex;
  width: 90vw;
  padding-right: 3rem;
  grid-gap: 2.5625rem;
  flex-direction: row;
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

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
        <header class="header">
          <div class="header__select">
            <h2 class="heading header__heading">Рассылки</h2>
          </div>
          <y-button :plus="true" @click="createMailing">Новая рассылка</y-button>
        </header>
        Список рассылок
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

export default {
  name: "MailingView",
  components: {
    CreateMailingBot,
    EditMailing,
    CreateMailing,
    YPopupWarn,
  },
  data() {
    return {
      window: 'main',
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

<template>
    <y-popup-warn></y-popup-warn>
    <div class="wrapper">
        <y-left-side-bar/>
        <main class="main">
            <!--
              Внутри этого template должна быть верстка касающаяся дефолт вида окна рассылок
              Тут должен быть список рассылок см. листочек с обсуждения
            -->
            <template v-if="window === 'main' || window == 'bot-edit'">
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
                            :filter-items="filterItems"
                        />
                    </template>
                    <div v-if="window == 'bot-edit'" class="tg-add">
                        <header class="row header">
                            <div class="col">
                                <h2 class="heading header__heading" @click="saveBot">Привязка Telegram</h2>
                            </div>
                        </header>
                        <h4 class="heading-small">Название</h4>
                        <y-input v-model="botName" class="name" placeholder="Введите название..."></y-input>
                        <h4 class="heading-small">Токен</h4>
                        <y-input v-model="botToken" class="token" placeholder="Введите токен..."></y-input>

                        <create-mailing-block :tg_block="true" class="greetings_block" @close="saveGreeting">
                            <template v-slot:btn_slot_name> Сохранить блок </template>
                        </create-mailing-block>
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
import DIstributionMessageType from "@/api/admin/distribution/DIstributionMessageType";
import Block from "@/api/admin/Block";
import {FilesModel} from "@/api/admin/FilesModel";
import YCoolButton from "@/components/UI/YCoolButton.vue";
import {Greetings} from "@/api/admin/greetings/Greetings";
import CreateMailingBlock from "@/components/Mailing/CreateMailingBlock.vue";
import {BotModel} from "@/api/admin/distribution/Bot";


const greetings = new Greetings();

export default {
    name: "MailingView",
    components: {
        CreateMailingBlock,
        YCoolButton,
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
            elements: [],
            testBlocks: [],
            blockIndex: 0,
            name: "",
            validation: {
                name: false
            },
            selectedType: 0,
            greetingsDistribution: {}
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

        const block = new Block()
        await block.getAll({filters: {company_id: null}})
            .then(async res => {
                if (res.ok) {
                    await res.json().then(data => data.body).then(r => this.testBlocks = r.map(el => ({
                        ...el,
                        active: false
                    })))
                }
                const {index, name, elements} = await this.$store.getters.selectedDistributionBlock;
                this.blockIndex = index;
                this.name = name;
                this.elements = elements.map(el => {
                    if (el.type_id === DIstributionMessageType.TEST) {
                        const tests = this.getTestBlocks(el.attachments.block_id)
                        return {
                            ...el,
                            validation: {
                                block_id: false,
                            },
                            tests
                        }
                    }
                    return {
                        ...el,
                        validation: {
                            text: false,
                            file_id: false,
                            block_id: false,
                            link: false,
                        }
                    }
                });
            })

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
        filterItems(el) {
            return !el.greetings
        },
        close() {
            this.$router.push('/distribution')
            this.window = 'main';
        },
        createElement(type) {
            let elementTemplate = {
                type_id: type,
                text: "",
                attachments: {},
                validation: {
                    text: false,
                    elements: false,
                }
            }
            switch (type) {
                case DIstributionMessageType.MEDIA:
                    elementTemplate.attachments.file_id = null;
                    elementTemplate.validation.file_id = false;
                    elementTemplate.showLabel = false;
                    break;
                case DIstributionMessageType.LINK:
                    elementTemplate.attachments.link = "";
                    elementTemplate.validation.link = false;
                    break;
                case DIstributionMessageType.TEST:
                    elementTemplate.tests = this.getTestBlocks(0);
                    elementTemplate.attachments.block_id = null;
                    elementTemplate.validation.block_id = false;
                    break;
                default:
                    break;
            }

            this.elements.push(elementTemplate)
        },
        dropValidation(element) {
            element.validation.text = false;
        },
        removeElement(index) {
            this.elements.splice(index, 1);
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
        async editBot(route) {
            const bot = new BotModel();
            console.log('bot', bot.isSet());
            this.greetingsDistribution = await greetings.getGreeting();

            await this.$store.dispatch('selectDistribution', this.greetingsDistribution.id);
            await this.$store.dispatch('selectDistributionBlock', 0);

            this.$router.push('/distribution/bot/edit')
            this.window = route;
        },
        saveGreeting() {
            const block = this.$store.getters.distributionBlocks[0]
            greetings.updateGreeting(this.greetingsDistribution.id, {block: {messages: block.elements, relative_id: 1, name: block.name}})
            this.saveBot()
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

        getMedia(event, element) {
            element.attachments.file_id = event.target.files[0];
            element.validation.file_id = false;
        },
        getAttachedFile(element) {
            if (!element.attachments.file_id)
                return false;
            if (element.attachments.file_id.name)
                return element.attachments.file_id.name;
            else {
                const fileModel = new FilesModel();
                fileModel.getModel(element.attachments.file_id).then(r => {
                    element.attachments.file_id = {
                        id: r.id,
                        name: r.path,
                    };
                });
                return 'file';
            }
        },
        clearFile(element) {
            element.attachments.file_id = null;
            console.log(element)
        },
        toggleMediaLabel(element) {
            element.showLabel = !element.showLabel;
            if (!element.showLabel)
                element.text = ""
        },
        selectTestBlock(testBlock, element) {
            element.tests.map(el => el.active = false)
            testBlock.active = true;
            element.attachments.block_id = testBlock.id;
            element.validation.block_id = false;
        },
        getTestBlocks(active) {
            console.log('BLOCKS', this.testBlocks);
            return [...this.testBlocks].map(el => ({...el, active: (el.id === active)}))
        },
    },
    computed: {
        DIstributionMessageType() {
            return DIstributionMessageType
        },
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
.greetings_block {
    margin-top: 2rem;
}

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

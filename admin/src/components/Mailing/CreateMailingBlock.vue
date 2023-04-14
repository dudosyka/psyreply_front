<template>
    <y-modal class="modal">
        <header class="header">
            <!--
              Если будешь заменять эту кнопку то не забудь в том элементе, на который заменишь, прописать точно такой же @click
              Подробнее см. пояснение внутри MailingView в методе close
            -->
            <y-left-arrow-button @click="close"/>
            <h1 class="heading">Новый блок рассылок</h1>


        </header>
        <y-input
                v-model="name"
                placeholder="Название блока"
        />

        <div class="container elements">
            <h3 class="add-heading">Добавление элементов</h3>
            <y-cool-button class="element-btn element-btn-active" @click="createElement(DIstributionMessageType.TEXT)">
                <i class="fa-solid fa-text-width"></i> Текст
            </y-cool-button>
            <y-cool-button class="element-btn element-btn-active" @click="createElement(DIstributionMessageType.MEDIA)">
                <i class="fa-solid fa-newspaper"></i> Медиа
            </y-cool-button>
            <y-cool-button class="element-btn element-btn-active" @click="createElement(DIstributionMessageType.LINK)">
                <i class="fa-solid fa-link"></i> Ссылка
            </y-cool-button>
            <y-cool-button class="element-btn element-btn-active" @click="createElement(DIstributionMessageType.TEST)">
                <i class="fa-solid fa-list"></i> Тест
            </y-cool-button>
            <!--      <y-cool-button  class="element-btn element-btn-active" @click="createElement(5)"><i class="fa-solid fa-route"></i> Навигация</y-cool-button>-->
        </div>

        <template v-for="(element, index) in elements">
            <div v-if="element.type_id === DIstributionMessageType.TEXT" class="element text">
                <h4 class="element-heading">Текст</h4>
                <textarea v-model="element.text" class="text-area"></textarea>
                <div class="row button-row">
                    <y-cool-button @click="removeElement(index)"
                                   class="element-btn element-delete element-delete-active"><i
                            class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                    </y-cool-button>
                </div>
            </div>

            <div v-if="element.type_id === DIstributionMessageType.MEDIA" class="element text-img">
                <h4 class="element-heading">Медиа</h4>
                <div class="row media-row">
                    <input @change="getMedia($event, element)" type="file" id="img" style="display:none;">
                    <label class="upload-text" for="img"><i class="fa-solid fa-file"></i> Выберите файл</label>
                    <y-cool-button class="element-btn element-btn-active" @click="createElement"><i
                            class="fa-solid fa-pen"></i> Подпись
                    </y-cool-button>
                </div>
                <h5 class="heading-small">Подпись</h5>
                <textarea class="text-area" v-model="element.text"></textarea>
                <div class="row button-row">
                    <y-cool-button @click="removeElement(index)"
                                   class="element-btn element-delete element-delete-active"><i
                            class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                    </y-cool-button>
                </div>
            </div>

            <div v-if="element.type_id === DIstributionMessageType.LINK" class="element button-element">
                <h4 class="element-heading">Ссылка</h4>
                <h5 class="heading-small">Текст кнопки</h5>
                <y-input v-model="element.text" class="button-text" placeholder="Текст кнопки"/>
                <h5 class="heading-small">URL</h5>
                <y-input v-model="element.attachments.link" class="button-text" placeholder="Адрес ссылки"/>
                <div class="row button-row">
                    <y-cool-button @click="removeElement(index)"
                                   class="element-btn element-delete element-delete-active"><i
                            class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                    </y-cool-button>
                </div>
            </div>

            <div v-if="element.type_id === DIstributionMessageType.TEST" class="element test-element">
                <h4 class="element-heading test">Тест</h4>
                <h5 class="heading-small">Привязать блок тестов</h5>
                <div class="container tests">
                    <y-list
                            key-of-name="name"
                            :editable="false"
                            :selectable="true"
                            @select="selectTestBlock($event, element)"
                            :items="element.tests"
                            :pagination="true"
                            :pagination-block="true"
                            :page-size="4"
                    />
                </div>
                <div class="row button-row">
                    <y-cool-button @click="removeElement(index)" class="element-btn element-delete"><i
                            class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                    </y-cool-button>
                </div>
            </div>

            <div v-if="element.type_id === 5" class="element nav-element">
                <h4 class="element-heading test">Навигация</h4>
                <div class="row media-row">
                    <h5 class="heading-small">Выберите, на какой блок рассылки переходить</h5>
                    <y-cool-button class="element-btn element-btn-active" @click="createElement"><i
                            class="fa-solid fa-pen"></i> Подпись
                    </y-cool-button>
                </div>
                <div class="container tests">
                    <y-list
                            v-if="tests.length > 0"
                            key-of-name="title"
                            :items="mailingBlocks"
                            :editable="false"
                            @edit="editTest"
                            :pagination="true"
                            :page-size="6"
                    />
                </div>
                <h5 class="heading-small">Подпись</h5>
                <textarea class="text-area">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</textarea>
                <div class="row button-row">
                    <y-cool-button class="element-btn element-delete element-delete-active"><i
                            class="fa-sharp fa-solid fa-trash"></i> Удалить элемент
                    </y-cool-button>
                </div>
            </div>
        </template>

        <div class="row button-row">
            <y-cool-button @click="saveBlock">Сохранить блок</y-cool-button>
        </div>
    </y-modal>
</template>

<script>
import Block from "@/api/admin/Block";
import DIstributionMessageType from "@/api/admin/distribution/DIstributionMessageType";

export default {
  name: "CreateMailingBlock",
  computed: {
    DIstributionMessageType() {
      return DIstributionMessageType
    }
  },
  data() {
    return {
      blockIndex: 0,
      name: "",
      elements: [],
      testBlocks: [],
      //1 - text, 2 - media, 3 - test, 4 - link
      selectedType: 0,
    }
  },
  async created() {
    const block = new Block()
    await block.getAll({filters: {company_id: null}})
      .then(async res => {
        if (res.ok) {
          await res.json().then(data => data.body).then(r => this.testBlocks = r.map(el => ({...el, active: false})))
        }
        const {index, name, elements} = await this.$store.getters.selectedDistributionBlock;
        this.blockIndex = index;
        this.name = name;
        this.elements = elements.map(el => {
          if (el.type_id == DIstributionMessageType.TEST) {
            const tests = this.getTestBlocks(el.attachments.block_id)
            return {
              ...el,
              tests
            }
          }
          return {
            ...el,
            
          }
        });
      })
    
  },
  methods: {
    selectTestBlock(testBlock, element) {
      element.tests.map(el => el.active = false)
      testBlock.active = true;
      element.attachments.block_id = testBlock.id;
    },
    getMedia(event, element) {
      element.attachments.file_id = event.target.files[0];
    },
    removeElement(index) {
      this.elements.splice(index, 1);
    },
    createElement(type) {
      let elementTemplate = {
        type_id: type,
        text: "",
        attachments: {}
      }
      switch (type) {
        case DIstributionMessageType.MEDIA:
          elementTemplate.attachments.file_id = null;
          break;
        case DIstributionMessageType.LINK:
          elementTemplate.attachments.link = "";
          break;
        case DIstributionMessageType.TEST:
          elementTemplate.tests = this.getTestBlocks(0);
          elementTemplate.attachments.block_id = null;
          break;
        default:
          break;
      }
      
      this.elements.push(elementTemplate)
    },
    getTestBlocks(active) {
      console.log('BLOCKS', this.testBlocks);
      return [...this.testBlocks].map(el => ({...el, active: (el.id == active)}))
    },
    saveBlock() {
      this.$store.dispatch('updateDistributionBlock', {
        index: this.blockIndex, block: {name: this.name, elements: this.elements}
      });
      this.$emit('close');
    },
    close() {
      this.$store.dispatch('clearNotSaveBlocks');
      this.$emit('close');
    }
  },
}
</script>

<style scoped>
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
    position: sticky !important;
    top: 0;
    padding: 1rem;
    background-color: rgb(12 16 24 / 90%);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
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
</style>
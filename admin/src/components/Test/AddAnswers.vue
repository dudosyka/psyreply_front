<template>
    <article class="wrapper">
        <y-modal class="modal">
            <header class="header">
                <div class="col-arrow">
                    <y-left-arrow-button @click="$emit('close')"/>
                </div>
                <div class="col-head">
                    <h1 class="heading">{{ editable ? "Добавить ответы" : "Просмотр ответов" }}</h1>
                </div>
            </header>

            <template v-if="answers.length > 0">
                <article v-for="(answer, id) of answers" class="answers__add">
                    <y-input :disabled="!editable" @input="giveData(answer, id)" v-model="answer.title"
                             placeholder="Введите ответ"></y-input>
                    <div class="question__coins">
                        <label class="label">Баллы за ответ</label>
                        <y-input :disabled="!editable" @input="giveData(answer, id)" v-model="answer.value"
                                 class="question__input"/>
                    </div>
                    <y-button v-if="editable" @click="removeAnswer(id)" class="question__del"><i
                            class="fa-solid fa-trash"></i></y-button>
                </article>
            </template>

            <hr/>

            <div class="anw__add__button" v-if="editable">
                <button @click="addAnswer" class="plus">+</button>
            </div>

            <div class="row-button">
                <y-cool-button class="btn-save" v-if="editable" @click="$emit('close')">Сохранить и вернтуься</y-cool-button>
            </div>
        </y-modal>
    </article>
</template>

<script>
export default {
  name: "AddAnswers",
  props: {
    questionId: Number,
    editable: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    addAnswer() {
      const answer = {}
      answer['id'] = this.answers.length + 1
      answer['title'] = null
      answer['value'] = null
      this.$store.commit('addAnswer', {
        answer,
        questionId: this.questionId
      })
    },
    removeAnswer(id) {
      this.$store.commit('removeAnswer', {
        id,
        questionId: this.questionId
      })
    },
    giveData(answer, id) {
      this.$store.commit('editAnswer', {
        answer,
        id,
        questionId: this.questionId
      })
    }
  },
  computed: {
    answers() {
      return this.$store.getters.question(this.questionId).answers
    }
  }
}
</script>

<style scoped>
.wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.42);
}

.header {
    display: flex;
    width: 100%;
    grid-gap: 0rem;
    justify-content: start;
    align-items: center;
}

.heading {
    font-size: 1.5rem;
    text-align: center;
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

.answers__add {
    display: grid;
    grid-template-columns: 60% 1fr 1fr;
    align-items: center;
    margin-top: 50px;
    grid-gap: 1.875rem;
}

.label {
    font-size: 1.1rem !important;
    margin-right: 12px;
}

.question__coins {
    display: grid;
    grid-template-columns: max-content minmax(50px, 100px);
    align-items: center;
    grid-gap: .3em;
}

.question__input {
    padding: .3em;
}

.question__del {
    color: white;
    padding: 0.3rem;
    background: rgba(255, 0, 89, 1);
    border: 2px solid rgba(255, 255, 255, 0.4);
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
}

hr {
    margin-top: 30px;
    margin-bottom: 30px;
    min-width: 30vw;
    border-left: 0px solid white;
    border-right: 0px solid white;
    border-bottom: 0px solid white;
    border-top: 1px solid var(--border-dark);
}

.anw__add__button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.plus {
    margin-left: 10px;
    background: rgba(255, 255, 255, 0.17);
    border-radius: 7px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    height: auto;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;
    width: 36px;
    line-height: 34px;
    font-size: 32px;
}
.col-arrow {
    width: 1vw;
}
.col-head {
    width: 100%;
}
.row-button {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.btn-save {
    width: 15vw;
}
</style>

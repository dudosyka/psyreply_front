<template>
  <article class="wrapper">
    <y-modal class="modal">
      <header class="header">
        <y-left-arrow-button @click="$emit('close')" />
        <h1 class="heading">Добавить ответы</h1>
      </header>

      <template v-if="answers.length > 0">
        <article v-for="(answer, id) of answers" class="answers__add" >
          <y-input @input="giveData(answer, id)" v-model="answer.title" placeholder="Введите ответ"></y-input>
          <div class="question__coins">
            <label class="label">Баллы за ответ</label>
            <y-input @input="giveData(answer, id)" v-model="answer.value" class="question__input" />
          </div>
          <y-button @click="removeAnswer(id)" class="question__del">X</y-button>
        </article>
      </template>

      <hr/>

      <div class="anw__add__button">
        <button @click="addAnswer" class="plus">+</button>
      </div>

      <y-cool-button @click="$emit('close')">Сохранить и вернтуься</y-cool-button>
    </y-modal>
  </article>
</template>

<script>
export default {
  name: "AddAnswers",
  props: [
    'questionId'
  ],
  methods: {
    addAnswer() {
      const answer = {}
      answer['id'] = this.answers.length
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
  display: grid;
  grid-template-columns: auto 1fr min-content;
  grid-gap: 2rem;
  justify-content: start;
  align-items: center;
}
.answers__add{
  display: grid;
  grid-template-columns: 60% 1fr 1fr;
  align-items: center;
  margin-top: 50px;
  grid-gap: 1.875rem;
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
  color: red;
  width: min-content;
}
hr {
  margin-top: 30px;
  margin-bottom: 30px;
  min-width: 30vw;
  border-left: 0px solid white;
  border-right: 0px solid white;
  border-bottom: 0px solid white;
  border-top: 1px solid rgba(255, 255, 255, 0.52);
}
.anw__add__button{
  display: flex;
  align-items: center;
  justify-content: center;
}
.plus{
  margin-left:10px ;
  background: rgba(255, 255, 255, 0.17);
  border-radius: 7px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  width: 26px;
  height: auto;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;

}
</style>

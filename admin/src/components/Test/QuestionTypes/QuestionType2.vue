<template>
  <article class="question">
    <span class="question__id">{{listId}}</span>
    <y-input @input="giveData" v-model="question.title" />
    <div class="question__coins">
      <label class="label">Баллы “Да”</label>
      <y-input @input="giveData" v-model="question.answers[0].value" class="question__input" />
      <label class="label">Баллы “Нет”</label>
      <y-input @input="giveData" v-model="question.answers[1].value" class="question__input" />
      <label class="label">Монеты</label>
      <y-input @input="giveData" v-model="question.coins" class="question__input" />
    </div>
    <y-button @click="$emit('remove')" class="question__del">X</y-button>
  </article>
</template>

<script>
export default {
  name: "QuestionType2",
  props: ['questionId'],
  methods: {
    giveData() {
      this.$store.commit('editQuestion', {
        questionId: this.questionId,
        question: this.question
      })
    },
  },
  computed: {
    question() {
      return this.$store.getters.question(this.questionId)
    },
    listId() {
      const listId = this.questionId + 1
      return listId
    },
  }
}
</script>

<style scoped>
.question {
  display: grid;
  grid-template-columns: auto auto auto min-content;
  grid-gap: 1.3rem;
  align-items: center;
}
.question__id {
  font-size: 2rem;
}
.question__coins {
  display: grid;
  grid-template-columns: max-content minmax(50px, 100px);
  align-items: center;
  grid-gap: .3em .5em;
}
.question__input {
  padding: .3em;
}
.question__del {
  color: red;
  width: min-content;
}
</style>

<template>
    <article class="question">
        <span class="question__id">{{ listId }}</span>
        <label>
            <h4 class="label">Заголовок теста</h4>
            <y-input :disabled="!editable" @input="giveData" v-model="question.title"/>
        </label>
        <div class="question__coins">
            <label>
                <h4 class="label">Баллы “Да”</h4>
                <y-input :disabled="!editable" @input="giveData" v-model="question.answers[0].value"
                         class="question__input"/>
            </label>
            <label>
                <h4 class="label">Баллы “Нет”</h4>
                <y-input :disabled="!editable" @input="giveData" v-model="question.answers[1].value"
                         class="question__input"/>
            </label>
            <label>
                <h4 class="label">Монеты</h4>
                <y-input :disabled="!editable" @input="giveData" v-model="question.coins" class="question__input"/>
            </label>

        </div>
        <y-button v-if="editable" @click="$emit('remove')" class="question__del"><i class="fa-solid fa-trash"></i>
        </y-button>
        <span v-else></span>
    </article>
</template>

<script>
export default {
  name: "QuestionType2",
  props: {'questionId': Number, editable: {default: false, type: Boolean}},
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
.label {
    margin-bottom: 1rem;
    margin-left: 0.3rem;
}

.question {
    display: grid;
    margin-top: 1rem;
    grid-template-columns: 2vw auto auto min-content;
    grid-gap: 1.3rem;
    align-items: center;
}

.question__id {
    font-size: 1.5rem;
}

.question__coins {
    display: flex;
    grid-template-columns: max-content minmax(50px, 100px);
    align-items: center;
    grid-gap: .3em .5em;
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

.question__del {
    color: white;
    padding: 0.3rem;
    background: rgba(255, 0, 89, 1);
    border: 2px solid rgba(255, 255, 255, 0.4);
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
}

.question__del:hover {
    cursor: pointer;
}
</style>

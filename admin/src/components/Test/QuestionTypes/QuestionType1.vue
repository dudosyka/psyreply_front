<template>
  <article class="question">
    <span class="question__id">{{listId}}</span>
    <y-input @input="giveData" v-model="question.title" />
   <div class="question__title__add">
    <h3>Ответы</h3>
     <button @click="popUp.show = true" class="question__add plus">+</button>
   </div>
    <y-button @click="$emit('remove')" class="question__del">X</y-button>

    <label>
      Монеты <y-input @input="giveData" v-model="question.coins" />
    </label>

    <add-answers
      :questionId="questionId"
      v-if="popUp.show === true"
      @close="popUp.show = false"
    />
  </article>
</template>

<script>
import AddAnswers from '@/components/Test/AddAnswers';

export default {
  name: "QuestionType1",
  components: {
    AddAnswers
  },
  props: [
    'questionId'
  ],
  data() {
    return {
      popUp: {
        show: false
      },
    }
  },
  methods: {
    giveData() {
      this.$store.commit('editQuestion', {
        questionId: this.questionId,
        question: this.question
      })
    },
  },
  computed: {
    listId() {
      const listId = this.questionId + 1
      return listId
    },
    question() {
      return this.$store.getters.question(this.questionId)
    }
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

.question__del {
  color: red;
  width: min-content;
}
.question__title__add{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.question__add{
  width: min-content;
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

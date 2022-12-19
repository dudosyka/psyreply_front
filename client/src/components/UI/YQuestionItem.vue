<template>
 <div class="yqitem">
   <p class="qtext">
     {{questionData.title}}
   </p>
   <div class="buttons">
      <y-button
        v-for="answer in answers"
        :key="answer.id"
        @click="selectAnswer(answer.id)"
        :active="(selectedAnswer[0] === answer.id)"
      >{{answer.title}}</y-button>
   </div>
 </div>
</template>

<script>
export default {
  name: "YQuestionItem",
  props: {
    testArrId: Number,
    questionArrId: Number,
    questionId: Number
  },
  data() {
    return {
      selectedAnswer: []
    }
  },
  methods: {
    selectAnswer(id) {
      this.selectedAnswer[0] = id
      const question_id = this.questionId + this.questionArrId * 3
      const data = {
        test_id: this.testArrId,
        question_id,
        answer: this.selectedAnswer
      }
      this.$store.commit('selectAnswer', data)
    }
  },
  computed: {
    questionData() {
      const coordinates = {
        test_id: this.testArrId,
        question_arr_id: this.questionArrId,
        question_id: this.questionId
      }
      return this.$store.getters.questionByGroupData(coordinates)
    },
    answers() {
      return JSON.parse(this.questionData.value)
    }
  }
}
</script>
<style scoped>
.buttons{
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.qtext {
  text-align: center;
}
@media screen and (max-width:820px){
  .qtext{
    font-size: 2rem;
  }

}
</style>

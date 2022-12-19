<template>
  <div class="YAnswersList">
    <div class="modal">
      <div class="list">
        <y-answers-item
          v-for="(answer, answer_arr_id) in answers"
          :active="(selectedAnswer.includes(answer.id))"
          @click="selectAnswer(answer.id)"
        >{{ answer.title }}</y-answers-item>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "YAnswersList",
  props: {
    testArrId: Number,
    questionArrId: Number,
    more: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedAnswer: []
    }
  },
  methods: {
    selectAnswer(id) {
      if (!this.more) {
        this.selectedAnswer[0] = id
      } else {
        if (this.selectedAnswer.includes(id)) {
          const index = this.selectedAnswer.indexOf(id)
          this.selectedAnswer.splice(index, 1)
        } else {
          this.selectedAnswer.push(id)
        }
      }
      const data = {
        test_id: this.testArrId,
        question_id: this.questionArrId,
        answer: this.selectedAnswer
      }
      this.$store.commit('selectAnswer', data)
    },
  },
  computed: {
    answers() {
      const coordinates = {
        test_id: this.testArrId,
        question_id: this.questionArrId
      }
      const question = this.$store.getters.questionData(coordinates)
      return JSON.parse(question.value)
    }
  }
}
</script>

<style scoped>
.YAnswersList{

}
.modal {
  background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.25) 2.81%, hsla(0, 0%, 100%, 0.1) 100.82%);
  padding: 3.0625rem 3.0625rem  3.0625rem;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 1rem;
  border-color: var(--light-opacity);
  border-width: 2px;
  border-style: solid;
  width: 100%;

}
.list{
  height: 30rem;
}

</style>

<template>
  <div class="YAnswersList">

    <div class="modal">
      <div class="list">
      <y-answers-item
          v-for="(answer, answer_arr_id) in answers"
          :active="(selectedAnswer.includes(answer.id))"
          :last="answer.last"
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
      let i = 0;
      const answers = JSON.parse(question.value);
      return answers.map(el => {
        el.last = (i >= answers.length - 1);
        i++;
        return el;
      });
    }
  }
}
</script>

<style scoped>
.YAnswersList{
}
.modal {
  background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.07) 2.81%, hsla(0, 0%, 100%, 0.07) 100.82%);
  padding: 3.6rem 3.6rem  3.6rem 3.6rem;
  box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
  border-radius: 3rem;
  border-color: var(--light-opacity);
  border-width: 2px;
  border-style: solid;
  width: 100%;
  height: 37vh;
  overflow-y: scroll;
}
.overlay {
  background: black;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.list{

  height: 25rem;
  z-index: 1;
}
@media screen and (max-width:820px){
  .modal {
    background: linear-gradient(140.62deg, hsla(0, 0%, 100%, 0.07) 2.81%, hsla(0, 0%, 100%, 0.07) 100.82%);
    padding: 3.6rem 3.6rem  3.6rem 3.6rem;
    box-shadow: 0 4px 52px hsla(274, 100%, 50%, 0.11);
    border-radius: 3rem;
    border-color: var(--light-opacity);
    border-width: 2px;
    border-style: solid;
    width: 100%;
    height: 32vh;
    overflow-y: scroll;
  }
}
</style>

<template>
  <div class="QuestionType">
    <y-icon class="q__logo" />
    <div class="questions">
      <p class="question__status">{{ questionData.title }}</p>
      <hr>
      <h2 class="question__status">{{ selectedAnswerTitle }}</h2>
      <y-range
          :min="answer.min"
          :max="answer.max"
          :step="1"
          v-model.number="selectedAnswer"
      />
      <y-cool-button
          class="q__button"
          @click="$emit('next')"
          :disabled="!haveAnswer"
      >
        Продолжить
      </y-cool-button>
      <div class="q__coins__per">
        <!--          <div class="coins">-->
        <!--            <img class="coins__img" src="@/assets/img/coins.svg" alt="">-->
        <!--            <p>200</p>-->
        <!--          </div>-->
        <p class="test__percent">{{passed}}% пройдено</p>
      </div>
    </div>
<!--    <y-modal class="q__modal">-->

<!--    </y-modal>-->
    <div class="back"></div>
  </div>
</template>

<script>
import YQuestionsList from "../../UI/YQuestionsList";
export default {
  name: "QuestionType2",
  components: {YQuestionsList},
  props: {
    testArrId: Number,
    questionArrId: Number,
    passed: Number,
  },
  data() {
    return {
      selectedAnswer: null,
      haveAnswer: false
    }
  },
  computed: {
    questionData() {
      const coordinates = {
        test_id: this.testArrId,
        question_id: this.questionArrId
      }

      return this.$store.getters.questionData(coordinates)
    },
    answer() {
      const answers = JSON.parse(this.questionData.value)
      const options = {}
      options.max = answers.length - 1
      options.min = 0
      return options
    },
    selectedAnswerTitle() {
      const answers = JSON.parse(this.questionData.value)
      if (typeof this.selectedAnswer === 'number') {
        return answers[this.selectedAnswer].title
      } else {
        return 'Сдвиньте ползунок'
      }
    }
  },
  watch: {
    selectedAnswer(newValue, oldValue) {
      if (typeof newValue === 'number') {
        this.haveAnswer = true
        const data = {
          test_id: this.testArrId,
          question_id: this.questionArrId,
          answer: [this.selectedAnswer + 1]
        }
        this.$store.commit('selectAnswer', data)
      }
    }
  }
}
</script>

<style scoped>
.QuestionType {
  height: 100%;
}
.question__text {
  font-size: 1rem!important;
}

.question {
  font-size: 1rem;
}

.question__status {
  font-size: 1.5rem;
}

@media screen and (max-width:820px) {
  .q__modal {
    overflow: scroll;
    height: 100%;
    min-height: 60%;
  }
  .test__percent{
    font-size: 2rem;
    padding-bottom: 3rem;
  }
  .coins{
    display: none;
  }
  .q__logo{
    margin-bottom: 2rem;
  }
  .question{
    font-size: 1rem;
  }
  .question__status{
    font-size: 2.5rem;
  }
}


.q__list{
  margin-top: 1rem;
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-width: 30vw;
  border-left: 0px solid white;
  border-right: 0px solid white;
  border-bottom: 0px solid white;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}
.coins{
  display: flex;
  flex-direction: row;
  align-items:center ;
  justify-content: center;
}
.questions{
  margin-top: 2rem;
  display: grid;
  grid-gap: 2.5rem;
  justify-items: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  width: 100%;
}

.q__coins__per{
  display: grid;
  align-items: center;
  grid-gap: 0.75rem;
}
.test__percent{
  text-align: center;
}
.back{
  background: linear-gradient(200.42deg, #FF758C 13.57%, #FF7EB3 98.35%);
  filter: blur(50px);
  width: 25rem;
  height: 4rem;
  margin-top: -4rem;
  z-index: -9999999;
}
.coins__img{
  margin-right:0.5rem ;
}

/*
.QuestionType{
  margin-top: 4em;
  margin-bottom: 4em;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
}
.q__modal{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width:820px) {
  .QuestionType{
    margin-top: 0em;
    margin-bottom: 0em;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
  }
  .test__percent{
    font-size: 2rem;
  }
  .coins{
    display: none;
  }
  .q__logo{
    margin-bottom: 2rem;
  }
  .question{
    font-size: 1rem;
  }
  .question__status{
    font-size: 2.5rem;
  }
}*/

</style>

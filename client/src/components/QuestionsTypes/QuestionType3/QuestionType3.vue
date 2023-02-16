<template>
  <div class="QuestionType">
    <y-icon @click="$emit('prev')" class="q__logo" />
    <div class="questions">
      <p class="question__text">{{questionData.title}}</p>
      <y-answers-list
          :test-arr-id="testArrId"
          :question-arr-id="questionArrId"
          :more="more"
      />
      <y-cool-button
          class="q__button"
          @click="$emit('next')"
          :disabled="!haveAnswer"
      >
        Продолжить
      </y-cool-button>
      <div class="q__coins__per">
        <!--          <div class="coins">
                    <img class="coins__img" src="@/assets/img/coins.svg" alt="">
                    <p>{{questionData.coins}}</p>
                  </div>-->
        <p class="test__percent">{{ passed }}% пройдено</p>
      </div>
    </div>
<!--    <y-modal class="q__modal">-->
<!--      -->
<!--    </y-modal>-->
    <div class="back"></div>
  </div>
</template>

<script>
export default {
  name: "QuestionType3",
  props: {
    testArrId: Number,
    questionArrId: Number,
    passed: Number,
    more: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(this.questionArrId);
  },
  computed: {
    questionData() {
      const coordinates = {
        test_id: this.testArrId,
        question_id: this.questionArrId
      }
      return this.$store.getters.questionData(coordinates)
    },
    haveAnswer() {
      const coordinates = {
        test_id: this.testArrId,
        answer_id: this.questionArrId
      }
      const answer = this.$store.getters.passedBlockAnswer(coordinates)
      return (answer.length > 0)
    }
  }
}
</script>

<style scoped>
.QuestionType {
  height: 100%;
}
@media screen and (max-width:820px) {
  .QuestionType {
    overflow-y: scroll;
  }
  .q__modal {
    height: 100%;
    min-height: 10%;
    overflow-y: scroll;
    position: fixed;
    display: flex;
    align-items: flex-end;
  }
  .question__text {
    font-size: 2.5rem!important;
  }
}
.question__text{
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: center;
}
.q__button--disable {
  opacity: .5;
}
</style>

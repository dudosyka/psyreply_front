<template>
  <div class="QuestionType">
    <div class="row header-row">
      <div class="col-2">
        <i @click="$emit('prev')" class="fa-solid fa-arrow-left"></i>
      </div>
      <div class="col-8">
        <y-icon @click="$emit('prev')" class="q__logo" />
      </div>
    </div>
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
import YIcon from "@/components/UI/YIcon.vue";

export default {
  name: "QuestionType3",
  components: {YIcon},
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
.col-8 {
  margin-right: 15rem;
}
i {
  font-size: 1.5rem;
}
.header-row {
  width: 100%;
  display: flex;
  gap: 11;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  row-gap: 0rem;
  column-gap: 0rem;
}
.QuestionType {
  overflow-y: scroll;
}
q__logo {
  padding-top: 0!important;
  margin-bottom: 0!important;
}
YIcon {
  padding-top: 0!important;
  margin-bottom: 0!important;
}

.QuestionType {
  height: 100%;
}
@media screen and (max-width:820px) {
  .col-8 {
    margin-right: 6rem;
  }
  i {
  font-size: 3rem;
}
  .header-row {
    width: 100%;
    display: flex;
    gap: 11;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    row-gap: 0rem;
    column-gap: 0rem;
  }
  .QuestionType {
    overflow-y: scroll;
  }
  q__logo {
    padding-top: 0!important;
    margin-bottom: 0!important;
  }
  YIcon {
    padding-top: 0!important;
    margin-bottom: 0!important;
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

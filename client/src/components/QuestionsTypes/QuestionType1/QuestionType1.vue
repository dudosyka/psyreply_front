<!-- Yes\No -->
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
      <y-questions-list
          :test-arr-id="testArrId"
          :question-arr-id="questionArrId"
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
  name: "QuestionType1",
  components: {YQuestionsList},
  props: {
    testArrId: Number,
    questionArrId: Number,
    passed: Number
  },
  computed: {
    haveAnswer() {
      const blockOnPass = this.$store.getters.blockOnPass
      const passedBlock = this.$store.getters.passedBlock
      const questions = blockOnPass.tests[this.testArrId].questions[this.questionArrId]

      let answers = 0
      for (let i = 0; i <= questions.length - 1; i++) {
        const passedTest = passedBlock.tests[this.testArrId]
        const answer = passedTest.answers[this.questionArrId * 3 + i].answer
        answers += answer.length
      }

      return (answers >= questions.length)
    }
  }
}
</script>

<style>
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
  overflow-y: hidden;
}
q__logo {
  padding-top: 0!important;
  margin-bottom: 0!important;
}
YIcon {
  padding-top: 0!important;
  margin-bottom: 0!important;
}

.QuestionType{
  height: 100%;
}

.q__modal{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
    overflow-y: hidden;
  }
  q__logo {
    padding-top: 0!important;
    margin-bottom: 0!important;
  }
  YIcon {
    padding-top: 0!important;
    margin-bottom: 0!important;
  }
  .question {
    height: 100%;
    /*overflow-y: scroll;*/
  }
  .QuestionType{
    margin-top: 0em;
    margin-bottom: 0em;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
  }
  .q__modal {
    height: 100vh;
  }
  .q__logo {
  }
  .test__percent{
    font-size: 2rem;
    padding-bottom: 3rem;
  }
  .coins{
    display: none;
  }
.q__logo{
}
  .questions{
    display: grid;
    grid-gap: 5rem!important;


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
  border-top: 1px solid rgba(255, 255, 255, 0.52);
}
.coins{
  display: flex;
  flex-direction: row;
  align-items:center ;
  justify-content: center;
}
.questions{
  display: grid;
  grid-gap: 1.5rem;

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
display: none;
}
.coins__img{
  margin-right:0.5rem ;
}


</style>

<template>
  <div class="main">
    <div class="main__bottom">
      <transition name="fade">
        <div v-if="allDataIsReady && step !== 'results'" class="bottom__container">
          <SwipeUpArrow v-if="step === 'before-test'"></SwipeUpArrow>
          <transition name="fade">
            <template v-if="step === 'before-test'">
              <y-modal class="before_test">
                <y-cool-button @click="startTest">Начать тестирование</y-cool-button>
              </y-modal>
            </template>
          </transition>

          <transition name="opacity">
            <div v-if="step === 'testing'">
              <template v-for="(test, test_arr_id) in blockOnPass.tests" :key="test.createdAt">
                <template v-for="(question, question_arr_id) in test.questions" :key="`${question.createdAt}${question.id}`">
                  <!--              TODO: change layout for transition animation -->
                  <transition name="opacity">
                    <template v-if="testNow === test_arr_id && questionNow === question_arr_id">
                      <!--               One fom more  -->
                      <template v-if="test.type_id === 1">
                        <question-type3
                          class="question"
                          :test-arr-id="test_arr_id"
                          :question-arr-id="question_arr_id"
                          :passed="percentOfPass"
                          @next="nextQuestion({test_arr_id, question_arr_id})"
                        />
                      </template>
                      <!--                Yes Not ki -->
                      <template v-else-if="test.type_id === 2">
                        <question-type1
                          class="question"
                          :test-arr-id="test_arr_id"
                          :question-arr-id="question_arr_id"
                          :passed="percentOfPass"
                          @next="nextQuestion({test_arr_id, question_arr_id})"
                        />
                      </template>
                      <!--                More from more -->
                      <!--                NOTE: just check 'more' attribute -->
                      <template v-else-if="test.type_id === 3">
                        <question-type3
                          class="question"
                          :test-arr-id="test_arr_id"
                          :question-arr-id="question_arr_id"
                          :passed="percentOfPass"
                          :more="true"
                          @next="nextQuestion({test_arr_id, question_arr_id})"
                        />
                      </template>
                      <template v-else-if="test.type_id === 4">
                        <!--                  Range -->
                        <question-type2
                          class="question"
                          :test-arr-id="test_arr_id"
                          :question-arr-id="question_arr_id"
                          :passed="percentOfPass"
                          @next="nextQuestion({test_arr_id, question_arr_id})"
                        />
                      </template>
                    </template>
                  </transition>
                </template>
              </template>
            </div>
          </transition>
        </div>
      </transition>

      <transition name="fade">
        <!--        TODO: do beautiful-->
        <template v-if="step === 'after-test'">
          <y-modal class="before_test">
            <h2 class="before_test__title">Тест пройден</h2>
            <y-cool-button @click="getCurResults">Посмотреть результаты</y-cool-button>
          </y-modal>
        </template>
      </transition>

      <transition name="fade">
        <template v-if="allResultsIsReady">
          <results v-if="step === 'results'" />
        </template>
      </transition>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import QuestionType1 from "@/components/QuestionsTypes/QuestionType1/QuestionType1.vue";
import QuestionType2 from "./components/QuestionsTypes/QuestionType2/QuestionType2";
import QuestionType3 from "./components/QuestionsTypes/QuestionType3/QuestionType3";
import Results from "./components/Results";
import router from '@/router';
import results from '@/components/Results';
import SwipeUpArrow from "@/components/UI/SwipeUpArrow.vue";

export default {
  components:{
    SwipeUpArrow,
    QuestionType1,QuestionType2,QuestionType3,Results
  },
  created() {
    if (window.location.pathname.length > 1) {

      const view = window.location.pathname.split('/')[1]
      const token = window.location.pathname.split('/')[2]
      //Crunch with localStorage, because store does not see changes after commit in router
      localStorage.setItem(`${view}Token`, token)
      localStorage.setItem('view', view)
      this.$router.replace('/')
    }

    if (!localStorage.getItem("testToken") && !localStorage.getItem("resultsToken"))
      window.location = 'https://psyreply.com';

    const view = localStorage.getItem('view')

    switch (view) {
      case 'results':
        this.step = 'results'
        this.getResultsData()
        break
      case 'test':
        this.step = 'before-test'
        this.getBlockData()
        break
    }
  },
  data() {
    return {
      testNow: 0,
      questionNow: 0,
      step: null, //TODO: remove after test
      startTime: null,
      endTime: null
    }
  },
  methods: {
    getBlockData() {
      this.$store.dispatch('getBlock')
    },
    getResultsData() {
      this.$store.dispatch('getResults')
    },
    startTest() {
      this.step = 'testing'
      this.startTime = Date.now()
    },
    nextQuestion(m) {
      const tests = this.blockOnPass.tests
      const questions = tests[this.testNow].questions

      if (this.testNow !== tests.length) {
        if (this.questionNow !== questions.length - 1) {
          this.questionNow += 1
        } else {
          this.questionNow = 0
          this.testNow++
        }
        this.$store.commit('answersPassedIncrement')
      }

      if (this.testNow === tests.length) {
        this.testNow++

        this.step = 'after-test'

        this.endTime = Date.now()
        const timeOnPas = this.endTime - this.startTime
        this.$store.commit('setTimeOnPass', timeOnPas)

        this.$store.dispatch('passBlock')
      }
    },
    getCurResults() {
      this.step = 'results';
      this.$store.dispatch('getCurResults')
    },
    getResults() {
      this.$store.dispatch('getResultsAfterPass')
    }
  },
  computed: {
    blockOnPass() {
      return this.$store.getters.blockOnPass
    },
    allDataIsReady() {
      return this.$store.getters.isAllDataReady
    },
    allResultsIsReady() {
      return this.$store.getters.isAllResultsReady
    },
    percentOfPass() {
      return this.$store.getters.relationAnswersAndPassedAnswers
    }
  },
  watch: {
    allResultsIsReady(newValue, oldValue) {
      if (newValue) {
        this.step = 'results'
      }
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');

.display__none {
  display: none;
}

/* TODO: fix layout for animation */

.slide-leave-active,
.slide-enter-active {
  opacity: 1;
  transition: all 0.5s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
}
.slide-leave-to {
  opacity: 0;
}

.fade-to-top-leave-active,
.fade-to-top-enter-active {
  opacity: 1;
  transition: all 0.5s;
}

.fade-to-top-enter-from,
.fade-to-top-leave-to {
  opacity: 0;
}

.opacity-leave-active,
.opacity-enter-active {
  opacity: 1;
  transition: all 0.5s;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

:root {
  --font-rubik: 'Rubik', sans-serif;

  --light: hsl(0, 0%, 100%);
  --light-opacity: hsla(0, 0%, 100%, 0.27);

  font-family: var(--font-rubik);
  font-size: calc(1vw + .2rem);
  color: var(--light);
  box-sizing: border-box;

  background-image: url('assets/img/bg.png');
  background-size: cover;
  background-attachment: fixed;
}

*,
::before,
::after {
  padding: 0;
  border: none;
  margin: 0;
  background: none;
  user-select: none;
  box-sizing: inherit;
  text-decoration: none;
}

.link:link,
.link:visited,
.link:hover,
.link:active {
  color: var(--light);
}
.main{
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.before_test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* TODO: remove important */
  margin-top: 5rem;
  padding: 2rem !important;
  width: min-content;
}

.before_test__title {
  margin-bottom: 1rem;
  font-size: 18px;
}

.main__bottom {
  position: relative;
}
.bottom__container {
  width: 100%;
}

.question {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
}

@media screen and (max-width:820px) {
  .before_test {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    top: auto;
  }
  .question {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    top: auto;
  }
  .main__bottom {
    display: flex;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

@media (min-width: 1000px) {
  :root {
    font-size: .8rem;
  }
}

</style>

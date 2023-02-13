<template>
  <div class="main">
    <div class="main__bottom">
        <div v-if="allDataIsReady && step !== 'results' && step !== 'after-test'" class="bottom__container animate__animated animate__fadeIn">
<!--          <SwipeUpArrow v-if="step === 'before-test'"></SwipeUpArrow>-->
            <template v-if="step === 'before-test'">
              <y-modal class="before_test animate__animated animate__fadeIn">
                <p class="before_test_text"><h3 class="before_test_heading">Добро пожаловать в Reply,<br> cистему диагностики состояния. </h3><br>

                  Впереди Вас ждет небольшой опрос, после которого Вы получите результаты в виде графического отчета и рекомендации от вашего психолога-куратора.<br><br>
                  Прочитайте каждый вопрос и выбирайте максимально близкий ответ из всех предложенных. Лучше, если вы будете отвечать быстро, а не обдумывать тщательно каждый ответ.<br><br>
                  <span class="disclaimer">Доступ к данным вашего опроса будет только у Вас и у психолога-куратора Reply.</span></p>
                <y-cool-button @click="startTest">Начать тестирование</y-cool-button>
              </y-modal>
            </template>

            <div class="animate__animated animate__fadeIn" v-if="step === 'testing'">
              <template v-for="(test, test_arr_id) in blockOnPass.tests" :key="test.createdAt">
                <template v-for="(question, question_arr_id) in test.questions" :key="`${question.createdAt}${question.id}`">
                    <template class="animate__animated animate__fadeIn" v-if="testNow === test_arr_id && questionNow === question_arr_id">
                      <!--               One fom more  -->
                      <template v-if="test.type_id === 1">
                        <question-type3
                          class="question animate__animated animate__fadeIn"
                          :test-arr-id="test_arr_id"
                          :question-arr-id="question_arr_id"
                          :passed="percentOfPass"
                          @next="nextQuestion({test_arr_id, question_arr_id})"
                        />
                      </template>
                      <!--                Yes Not ki -->
                      <template v-else-if="test.type_id === 2">
                        <question-type1
                          class="question animate__animated animate__fadeIn"
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
                          class="question animate__animated animate__fadeIn"
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
                          class="question animate__animated animate__fadeIn"
                          :test-arr-id="test_arr_id"
                          :question-arr-id="question_arr_id"
                          :passed="percentOfPass"
                          @next="nextQuestion({test_arr_id, question_arr_id})"
                        />
                      </template>
                    </template>
                </template>
              </template>
            </div>
<!--          второй вариант-->
            <div class="animate__animated animate__fadeIn" v-if="step === 'gaming'">
              <BirdGameView v-if="!secondGame" @first-game-ended="gamesEnded"></BirdGameView>
              <ClickGameView v-if="secondGame" @second-game-ended="gamesEnded"></ClickGameView>
            </div>
        </div>

        <template class="animate__animated animate__fadeIn" v-if="step === 'after-test'">
          <y-modal class="before_test animate__animated animate__fadeIn">
            <h2 class="before_test__title">Тест пройден</h2>
            <y-cool-button @click="getCurResults">Посмотреть результаты</y-cool-button>
          </y-modal>
        </template>

        <template class="animate__animated animate__fadeIn" v-if="allResultsIsReady">
          <results class="animate__animated animate__fadeIn" v-if="step === 'results'" />
        </template>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import QuestionType1 from "@/components/QuestionsTypes/QuestionType1/QuestionType1.vue";
import QuestionType2 from "./components/QuestionsTypes/QuestionType2/QuestionType2";
import QuestionType3 from "./components/QuestionsTypes/QuestionType3/QuestionType3";
import Results from "./components/Results";
import results from '@/components/Results';
import BirdGameView from "./views/BirdGameView.vue";
import ClickGameView from "./views/ClickGameView.vue";

export default {
  components:{
    ClickGameView,
    BirdGameView,
    // SwipeUpArrow,
    QuestionType1,QuestionType2,QuestionType3,Results
  },
  created() {

    if (window.location.pathname.length > 1) {

      let tlgId = 828522413;
      let botNum = 0;
      let username = "ошибочка"
      let paramStr = window.location.href.split('?');
      if (paramStr.length > 1) {
        const params = paramStr[1].split("&");
        if (params.length >= 2) {
          tlgId = params[0].split('=')[1];
          botNum = params[1].split('=')[1];
          username = params[2].split('=')[1];
        } else {
          tlgId = params[0].split('=')[1];
        }
      }

      localStorage.setItem('tlgId', tlgId);
      localStorage.setItem('botNum', botNum);
      localStorage.setItem('username', username);

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
      case 'results_by_test':
        this.step = 'results'
        this.getResultsDataByTestToken();
        break;
    }
  },
  data() {
    return {
      testNow: 0,
      questionNow: 0,
      step: 'before-test', //TODO: remove after test
      startTime: null,
      endTime: null,
      secondGame: false
    }
  },
  methods: {
    getBlockData() {
      this.$store.dispatch('getBlock')
    },
    getResultsData() {
      this.$store.dispatch('getResults')
    },
    getResultsDataByTestToken() {
      this.$store.dispatch('getResultsByTestToken')
    },
    startTest() {
      this.step = 'testing'
      this.startTime = Date.now()
    },
    gamesEnded() {
      if (this.secondGame || (!this.secondGame && this.blockOnPass.games.length === 1))
        this.step = 'after-test'
      else
        this.secondGame = true;
    },
    nextQuestion(m) {
      const tests = this.blockOnPass.tests
      const games = this.blockOnPass.games
      let birdCompl = false
      let clickerCompl = false
      let countGames = 0
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

        if(games.length == 0){
          this.step = 'after-test'
        } else {
          if (games[0].type_id == 6 && games.length == 1)
            this.secondGame = true;
          this.step = 'gaming'
        }

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

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #B8C0C2 #323232;
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  width: 7px;
  max-height: 70vh;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  height: 70vh;
  margin-top: 5rem;
  margin-bottom: 5rem;
  margin-right: 2rem;
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-track:hover {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-track:active {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #323232;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #323232;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #323232;
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
.before_test_text {
  font-size: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 50vw;
  text-align: left;
}
.disclaimer {
  font-style: italic;
  color: #ffffff66;
  font-weight: 400;
  font-size: 1.3rem;
}
.before_test_heading {
  border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  padding-bottom: 2rem;
  text-align: left
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
  left: 50%;
  /*transform: translateX(-50%);*/
  top: 20%;
  height: 100%;
}

@media screen and (max-width:820px) {
  .before_test_text {
    font-size: 2rem;
    padding: 2rem;
    margin-bottom: 2rem;
    width: 87vw;
    text-align: left;
  }
  .disclaimer {
    font-style: italic;
    color: #ffffff66;
    font-weight: 400;
    font-size: 1.7rem;
  }
  .before_test_heading {
    border-bottom: 1px solid rgba(255, 255, 255, 0.24);
    padding-bottom: 2rem;
    text-align: left
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

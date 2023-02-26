import { createStore } from 'vuex'
import Client from '@/api/Client';
import axios from "axios";

export default createStore({
  state: {
    blockOnPass: null,
    passedBlock: null,
    allDataIsReady: false,
    allResultsIsReady: false,
    answersCount: null,
    answersPassed: null,
    // not use because use localStorage - it's crunch (((
    // testToken: null,
    // resultsToken: null,
    view: null,
    userId: null,
    results: null,
    tokens: [
        '5783059057:AAFKjXFRicrIanLozc5RTue_Hl7y_imwY1A',
        '5208325504:AAEKGs0MqFVQ-NHJnuzXqKol9H-fkOS9-YM',
        '6069143205:AAFbUz4h_fdrdgGxujkQsrZWKYWOJdF0Vsk',
        '5927214631:AAGhrTprF62v7o1MTQjqHicTye6-VPkLneE'
    ]
  },
  getters: {
    // not use because use localStorage - it's crunch (((
    // testToken(state) {
    //   return state.testToken
    // },
    // resultsToken(state) {
    //   return state.resultsToken
    // },
    blockOnPass(state) {
      return state.blockOnPass
    },
    passedBlock(state) {
      return state.passedBlock
    },
    results(state) {
      return state.results
    },
    isAllDataReady(state) {
      return state.allDataIsReady
    },
    isAllResultsReady(state) {
      return state.allResultsIsReady
    },
    questionData: (state) => (coordinates) => {
      const test = state.blockOnPass.tests[coordinates.test_id]
      return test.questions[coordinates.question_id]
    },
    questionByGroupData: (state) => (coordinates) => {
      const test = state.blockOnPass.tests[coordinates.test_id]
      const questionsGroup = test.questions[coordinates.question_arr_id]
      return questionsGroup[coordinates.question_id]
    },
    passedBlockAnswer: (state) => (coordinates) => {
      const test = state.passedBlock.tests[coordinates.test_id]
      return test.answers[coordinates.answer_id].answer
    },
    relationAnswersAndPassedAnswers(state) {
      return Math.floor(state.answersPassed / state.answersCount * 100  )
    },
    view(state) {
      return state.view
    },
  },
  mutations: {
    updateBlockOnPass(state, block) {
      state.blockOnPass = block
    },
    updatePassedBlock(state, block) {
      state.passedBlock = block
    },
    updateResults(state, results) {
      state.results = results
    },
    allDataIsReady(state) {
      state.allDataIsReady = true
    },
    allResultsIsReady(state) {
      state.allResultsIsReady = true
    },
    selectAnswer(state, data) {
      const test = state.passedBlock.tests[data.test_id]
      test.answers[data.question_id].answer = data.answer
    },
    setTimeOnPass(state, data) {
      state.passedBlock.time_on_pass = data
    },
    answersPassedIncrement(state) {
      state.answersPassed++
    },
    answersPassedDecrement(state) {
      state.answersPassed--
    },
    setAnswersCount(state, data) {
      state.answersCount = data
    },
    // Not use, because tokens in localStorage - it's crunch (((
    // setToken(state, data) {
    //   state[`${data.type}Token`] = data.token
    //   state.view = data.type
    // },
    updateUserId(state, data) {
      state.userId = data
    }
  },
  actions: {
    async getBlock({ commit }) {
      const client = new Client()

      const token = localStorage.getItem('testToken')

      client.getBlock(token)
        .then(r => {
          const passedBlock = {
            time_on_pass: 0,
            tests: []
          }
          r.tests.forEach(test => {
            if (test.type_id == 6 || test.type_id == 7)
              return;
            passedBlock.tests.push({
              test_id: test.id,
              answers: []
            })
            test.questions.forEach(question => {
              passedBlock.tests[passedBlock.tests.length - 1].answers.push({
                question_id: question.id,
                answer: []
              })
            })
          })
          commit('updatePassedBlock', passedBlock)

          r.games = r.tests.filter((test)=>test.type_id == 6 || test.type_id == 7)
          r.tests = r.tests.map((test, id, array) => {
            if (test.type_id === 2) {
              const questionGroups = []
              test.questions.forEach((el, id) => {
                if (id % 3 === 0) {
                  questionGroups.push([el])
                } else {
                  questionGroups[questionGroups.length - 1].push(el)
                }
              })
              array[id].questions = questionGroups
            }
            return test;
          }).filter((test) => test.type_id != 6 && test.type_id != 7)

          commit('updateBlockOnPass', r)

          let answersCount = 0
          r.tests.map(test => test.questions.map(q => answersCount++))
          commit('setAnswersCount', answersCount)

          commit('allDataIsReady')
        })
    },

    async passBlock({ state, commit }) {
      const client = new Client()

      const token = localStorage.getItem('testToken')

      client.passBlock(state.passedBlock, token)
        .then(res => {
          commit('updateUserId', res.user_id)
        })
    },

    async getResults({ commit, state }) {
      const client = new Client()

      const token = localStorage.getItem('resultsToken')
      const userId = state.userId

      client.getResults(token, userId).then(res => {
        commit('updateResults', res)
        commit('allResultsIsReady')
      })
    },

    async getResultsByTestToken({dispatch}) {
      const client = new Client()
      const token = localStorage.getItem('results_by_testToken')
      console.log(token);

      client.changeTokenToUserToken(token).then(res => {
        const token = res.split('/results/')[1]
        localStorage.setItem('resultsToken', token)
        dispatch('getResults')
      })
    },

    async getCurResults({ state, commit, dispatch }) {
      const client = new Client()

      const token = localStorage.getItem('testToken')

      client.getCurResults(token).then(res => {
        commit('updateResults', res)
        commit('allResultsIsReady')
      })

      const chatId = parseInt(localStorage.getItem('tlgId'));
      const botNum = parseInt(localStorage.getItem('botNum'));
      const username = localStorage.getItem("username");

      const botToken = state.tokens[botNum];
      // const chatId = 828522413;
      const text = `<b>Грацци! Мы закончили!</b>%0a%0aВаш личный Дашборд - графический отчет о вашем ментальном и физиологическом состояниях готов%0a%0aВы можете получить комментарий от психолога-куратора, нажав кнопку ниже`;
      const markup = JSON.stringify({
        "inline_keyboard":
            [
              [
                {
                  "text": "👩‍🏫 Получить комментарий",
                  "callback_data":"Получить комментарий"
                }
              ],
              [
                {
                  "text": "📊 Получить дашборд",
                  "url":"https://client.psyreply.com/results_by_test/" + localStorage.getItem("testToken")
                }
              ]
            ]
      });

      axios.post(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${text}&reply_markup=${markup}`).then(res => {
        console.log(res)
        if (chatId !== 828522413) {
          axios.post(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=1035004881&text=Пользователь ${username} прошел опрос`);
          axios.post(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=5664691851&text=Пользователь ${username} прошел опрос`);
        }
      }).catch(err => {
        console.error(err);
      })
    },

    async getResultsAfterPass({ state, commit, dispatch }) {
      const client = new Client()

      const blockToken = localStorage.getItem('testToken')

      client.changeTokenToUserToken(blockToken, state.userId)
        .then(res => {
          const token = res.split('/results/')[1]
          localStorage.setItem('resultsToken', token)
          dispatch('getResults')
        })

    }
  },
  modules: {
  }
})

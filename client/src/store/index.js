import { createStore } from 'vuex'
import Client from '@/api/Client';

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
        .then(res => {
          if (res.ok) {
            res.json().then(r => {
              const passedBlock = {
                time_on_pass: 0,
                tests: []
              }
              r.tests.forEach(test => {
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

              r.tests.map((test, id, array) => {
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
              })
              commit('updateBlockOnPass', r)

              let answersCount = 0
              r.tests.map(test => test.questions.map(q => answersCount++))
              commit('setAnswersCount', answersCount)

              commit('allDataIsReady')
            })
          }
        })
    },

    async passBlock({ state, commit }) {
      const client = new Client()

      const token = localStorage.getItem('testToken')

      client.passBlock(state.passedBlock, token)
        .then(res => {
          if (res.ok) {
            res.json().then(r => commit('updateUserId', r.user_id))
          }
        })
    },

    async getResults({ commit, state }) {
      const client = new Client()

      const token = localStorage.getItem('resultsToken')
      const userId = state.userId

      client.getResults(token, userId).then(res => {
        if (res.ok) {
          res.json().then(r => {
            commit('updateResults', r)
            commit('allResultsIsReady')
          })
        }
      })
    },

    async getCurResults({ state, commit, dispatch }) {
      const client = new Client()

      const token = localStorage.getItem('testToken')

      client.getCurResults(token).then(res => {
        if (res.ok) {
          res.json().then(r => {
            commit('updateResults', r)
            commit('allResultsIsReady')
          })
        }
      })
    },

    async getResultsAfterPass({ state, commit, dispatch }) {
      const client = new Client()

      const blockToken = localStorage.getItem('testToken')

      client.changeTokenToUserToken(blockToken, state.userId)
        .then(res => {
          if (res.ok) {
            res.text().then(r => {
              const token = r.split('/results/')[1]
              localStorage.setItem('resultsToken', token)
              dispatch('getResults')
            })
          }
        })

    }
  },
  modules: {
  }
})

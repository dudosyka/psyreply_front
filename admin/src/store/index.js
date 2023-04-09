import { createStore } from 'vuex'
import mainConf, {ProjectState} from "../../../main.conf";
import {BotModel} from "@/api/admin/Bot";
import {Distribution} from "@/api/admin/Distribution";
import Company from "@/api/admin/Company";

export default createStore({
  state: {
    app: {
      popupError: {
        show: false,
        message: null
      },
      popupWarn: {
        show: false,
        message: null,
        acceptCallback: null,
      },
      popup: {
        show: false,
        message: null
      },
    },
    newTest: {
      questionsCount: 0,
      questions: []
    },
    newBlock: {
      selectedTests: []
    },
    results: {
      editBlock: null
    },
    company: {
        users: [],
    },
    group: {
    },
    currentEmail: "",
    signUpData: [],
    distribution: {
      isBotSet: false,
      list: [],
        selected: {
          id: null
        }
    }
  },
  getters: {
    isBotSet(state) {
      return state.distribution.isBotSet;
    },
    distributionList(state) {
        return state.distribution.list;
    },
      selectedDistribution(state) {
        return state.distribution.selected;
      },
      companyUsers(state) {
        return state.company.users;
      },
    getSignUpData(state){
      return state.signUpData
    },
    editBlock(state) {
      return state.results.editBlock
    },
    questions(state) {
      return state.newTest.questions
    },
    question: (state) => (id) => {
      return state.newTest.questions[id]
    },
    test: (state) => {
      return state.newTest
    },
    popupError(state) {
      return state.app.popupError
    },
    popupWarn(state) {
      return state.app.popupWarn
    },
    popup(state) {
      return state.app.popup
    },
    blockCreate(state) {
      return state.newBlock;
    },
    currentEmail(state) {
      return state.currentEmail;
    }
  },
  mutations: {
    setCurrentEmail(state, currentEmail) {
      state.currentEmail = currentEmail;
    },
    setEditBlock(state, block) {
      state.results.editBlock = block
    },
    removeEditBlock(state) {
      state.results.editBlock = null
    },
    addQuestion(state, { question, needCopy }) {
      question.id = state.newTest.questionsCount
      state.newTest.questions.push(question)
      state.newTest.questionsCount++

      if (state.newTest.questions.length > 1 && needCopy) {
        let i = 1;
        state.newTest.questions[0].answers.map(el => {
          let answer = el;
          answer.id = i;
          this.commit("addAnswer", {
            answer,
            questionId: question.id
          });
          i++
        })
      }
    },
    editQuestion(state, question) {
      state.newTest.questions.map((el, index) => {
        if (el.id === question.id) {
          state.newTest.questions[index] = question
        }
      })
    },
    removeQuestion(state, question) {
      state.newTest.questions.splice(question, 1)
      state.newTest.questionsCount--;
    },
    fillQuestions(state, questions) {
      state.newTest.questions = questions
      state.newTest.questionsCount = questions.length;
    },
    addAnswer(state, data) {
      if (mainConf.projectState === ProjectState.dev)
        console.log(data)
      state.newTest.questions[data.questionId].answers.push(data.answer)
    },
    editAnswer(state, data) {
      state.newTest.questions[data.questionId].answers[data.id] = data.answer
    },
    removeAnswer(state, data) {
      state.newTest.questions[data.questionId].answers.splice(data.id, 1)
    },
    clearNewTest(state) {
      state.newTest = {
        questionsCount: 0,
        questions: []
      }
    },
    fillTest(state, test) {
      state.newTest = test
    },
    openErrorPopup(state, message) {
      state.app.popupError.show = true
      state.app.popupError.message = message
    },
    closeErrorPopup(state) {
      state.app.popupError.show = false
      state.app.popupError.message = ''
    },
    openWarnPopup(state, { message, acceptCallback }) {
      state.app.popupWarn.show = true;
      state.app.popupWarn.message = message;
      state.app.popupWarn.acceptCallback = acceptCallback;
    },
    acceptWarnPopup(state) {
      state.app.popupWarn.acceptCallback();
    },
    closeWarnPopup(state) {
      state.app.popupWarn.show = false;
      state.app.popupWarn.message = "";
    },
    openPopup(state, message) {
      state.app.popup.show = true
      state.app.popup.message = message
      setTimeout(() => {
        state.app.popup.show = false
        state.app.popup.message = ''
      }, 3000)
    },
    setEditCompany(state, company) {
      state.company = company;
    },
    setEditGroup(state, group) {
      state.group = group;
    },
    blockCreateSetTests(state, tests) {
      state.newBlock.selectedTests = tests;
    },
      setDistributionList(state, list) {
        state.distribution.list = list;
      },
      setIsBotSet(state, isBotSet) {
        state.distribution.isBotSet = isBotSet;
      },
      setCompanyUsers(state, users) {
        state.company.users = users;
      },
      setSelectedDistribution(state, dist) {
        state.distribution.selected = dist;
      }
  },
  actions: {
    createGroup() {
    },
    async loadDistributions({ commit }) {
        const botModel = new BotModel();
        const distribution = new Distribution();
        const company = new Company();
        const list = await distribution.getAll();
        const isBotSet = await botModel.isSet();
        const users = await company.getAllUsers();
        commit('setDistributionList', list);
        commit('setIsBotSet', isBotSet);
        commit('setCompanyUsers', users);
    },
      setSelectedDistribution({ commit }, id) {
          const distribution = new Distribution();
        const selected = distribution.getOne(id);
        commit('setSelectedDistribution', selected);
      }
  },
  modules: {
  }
})

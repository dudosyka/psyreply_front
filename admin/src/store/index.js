import {createStore} from 'vuex'
import mainConf, {ProjectState} from "../../../main.conf";
import {BotModel} from "@/api/admin/distribution/Bot";
import {Distribution} from "@/api/admin/distribution/Distribution";
import Company from "@/api/admin/Company";
import DIstributionMessageType from "@/api/admin/distribution/DIstributionMessageType";
import {FilesModel} from "@/api/admin/FilesModel";

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
    group: {},
    currentEmail: "",
    signUpData: [],
    distribution: {
      isBotSet: false,
      list: [],
      selected: {
        index: null,
        id: null,
        name: null,
        onetime: null,
        day_period: null,
        send_time: {
          hours: null,
          minutes: null
        },
        recipients: [],
        blocks: [],
        selectedBlock: null,
      },
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
    distributionBlocks(state) {
      return state.distribution.selected.blocks.map((el, index) => {
        return {
          ...el,
          index
        }
      });
    },
    selectedDistributionBlock(state) {
      return state.distribution.selected.selectedBlock;
    },
    companyUsers(state) {
      return state.company.users;
    },
    getSignUpData(state) {
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
    addQuestion(state, {question, needCopy}) {
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
    openWarnPopup(state, {message, acceptCallback}) {
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
    newDistribution(state, recipients) {
      state.distribution.selected = {
        name: "",
        onetime: true,
        day_period: 1,
        send_time: {
          hours: null,
          minutes: null
        },
        recipients,
        blocks: [],
        selectedBlock: null
      };
    },
    setSelectedDistribution(state, distribution) {
      state.distribution.selected = distribution;
    },
    
    addDistributionBlock(state, {name, elements}) {
      state.distribution.selected.blocks.push({name, elements, new: true})
    },
    setSelectedDistributionBlock(state, index) {
      state.distribution.selected.selectedBlock = {
        ...state.distribution.selected.blocks[index],
        index
      };
    },
    setDistributionBlock(state, {index, block: {name, elements}}) {
      state.distribution.selected.blocks[index] = {
        name, elements
      }
    }
  },
  modules: {},
  actions: {
    createGroup() {
    },
    async loadDistributions({commit}) {
      const botModel = new BotModel();
      const distribution = new Distribution();
      const company = new Company();
      const list = (await distribution.getAll());
      const isBotSet = await botModel.isSet();
      commit('setDistributionList', list);
      commit('setIsBotSet', isBotSet);
    },
    
    async createNewDistribution({commit}) {
      const company = new Company();
      
      const recipients = await company.getAllUsers().then(r => {
        return r.map(el => ({...el, active: false}));
      });
      
      commit('newDistribution', recipients)
    },
    async selectDistribution({commit}, id) {
      const distribution = new Distribution();
      const selected = await distribution.getOne(id);
      console.log(selected);
      const userIds = selected.contacts.map(el => el.id);
      const company = new Company();
      selected.recipients = await company.getAllUsers().then(r => {
        return r.map(el => ({...el, active: userIds.includes(el.id)}));
      });
      //Тут надо написать ещё обработку чтобы челики выбранные стали active: true
      commit('setSelectedDistribution', {
        ...selected,
        send_time: (() => {
          const hours = parseInt(selected.send_time.split(':')[0])
          const minutes = parseInt(selected.send_time.split(":")[1])
          return {
            hours: hours >= 10 ? hours : `0${hours}`, minutes: minutes >= 10 ? minutes : `0${minutes}`
          }
        })(),
        blocks: selected.blocks.map(el => ({
          ...el, elements: el.messages.map(el => {
            return {
              ...el,
              attachments: JSON.parse(el.attachments)
            }
          })
        }))
      });
    },
    async saveDistribution({state}, data) {
      const model = new Distribution();
      console.log(data);
      const dto = {
        ...data,
        blocks: await Promise.all(state.distribution.selected.blocks.map(async (el, index) => {
          const {elements, name} = el;
          return {
            name,
            messages: await Promise.all(elements.map(async el => {
              if (el.type_id == DIstributionMessageType.MEDIA && typeof el.attachments.file_id === 'object') {
                const fileModel = new FilesModel();
                el.attachments.file_id = await fileModel.import(el.attachments.file_id).then(r => r.id).catch(err => {
                  console.log('err3', err);
                });
              }
              return {
                ...el,
              }
            })),
            relative_id: index + 1
          }
        })).catch(err => {
          console.log('err2', err);
        })
      };
      //If we have ID, try to update
      if (state.distribution.selected.id) {
        await model.update(state.distribution.selected.id, dto);
      }
      //If no id in selected object than we do creation
      else {
        await model.create(dto);
      }
    },
    
    createNewDistributionBlock({commit, state}) {
      commit('addDistributionBlock', {name: "", elements: []})
      return state.distribution.selected.blocks.length - 1;
    },
    selectDistributionBlock({commit, state}, index) {
      commit('setSelectedDistributionBlock', index);
    },
    updateDistributionBlock({commit}, {index, block: {name, elements}}) {
      elements = elements.map((el, key) => {
        return {
          ...el,
          relative_id: key + 1
        }
      })
      commit('setDistributionBlock', {index, block: {name, elements}})
    },
    clearNotSaveBlocks({state}) {
      state.distribution.selected.blocks = state.distribution.selected.blocks.filter(el => !el.new);
    }
  }
})

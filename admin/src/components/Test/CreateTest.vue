<template>
    <y-modal class="modal">
        <template v-if="window === 'main'" :show="showSlideBar">
            <header class="header">
                <y-left-arrow-button v-if="testId === -1" @click="close"/>
                <h1 class="heading">{{ title }}</h1>
            </header>
            <article class="main"> <!-- We can use main единожды !-->
                <div class="main__input_coins">
                    <y-input :disabled="!editable" v-model="test.title" placeholder="Название теста..."/>
                </div>

                <div class="types">
                    <div class="type__test">
                        <h6 class="type__test__title">Тип теста</h6>
                        <div class="row">
                            <template
                                    v-for="type of questionTypes"
                                    :key="`${type.id}${type.name}`"
                            >
                                <!--                <button-->
                                <!--                    class=""-->
                                <!--                    @click="selectLabel('type', type.id)"-->
                                <!--                    :disabled="!editable"-->
                                <!--                    v-if="type.id === test.type || editable"-->
                                <!--                >-->
                                <!--                  {{ type.name }}-->
                                <!--                </button>-->
                                <y-mini-button
                                        class="type__test__type"
                                        :active="type.id === test.type"
                                        @click="selectLabel('type', type.id)"
                                        :disabled="!editable"
                                        v-if="type.id === test.type || editable"
                                >
                                    {{ type.name }}
                                </y-mini-button>
                            </template>
                        </div>
                    </div>
                    <div class="type__metrics">
                        <h6 class="type__test__title">Тип метрики</h6>
                        <template
                                v-for="metric of metrics"
                                :key="`${metric.id}${metric.name}`"
                        >
                            <y-mini-button
                                    class="type__test__type"
                                    :active="metric.id === test.metric"
                                    @click="selectLabel('metric', metric.id)"
                                    :disabled="!editable"
                                    @contextmenu.prevent="openRemoveMetricPopUp(metric.id)"
                                    v-if="metric.id === test.metric || editable"
                            >
                                {{ metric.name }}
                            </y-mini-button>
                        </template>
                        <y-mini-button
                                v-if="editable"
                                class="type__test__type"
                                @click="createMetric"
                        >
                            Добавить
                        </y-mini-button>
                    </div>
                </div>
            </article>

            <section v-if="test.metric > 0 && test.type > 0" class="questions">
                <hr/>
                <div class="header__plus">
                    <h2 class="heading">Вопросы</h2>
                    <y-cool-button v-if="questions.length <= 0" class="ml-1" @click="addQuestion">Добавить вопрос
                    </y-cool-button>

                </div>

                <template v-if="questions.length > 0">

                    <template v-for="(question, id) in questions" :key="`${id}${question.id}`">
                        <question
                                :editable="editable"
                                :question-id="id"
                                :type="test.type"
                                @remove="removeQuestion(id)"
                        />
                    </template>
                    <div class="row center-button">
                        <y-cool-button v-if="editable" @click="addQuestion">Добавить вопрос</y-cool-button>
                    </div>

                    <div class="type__test">
                        <h4 class="type__test__title">Формула</h4>
                        <y-input :disabled="!editable" class="w-50" v-model="test.formula"/>
                        <br>
                        <div v-if="editable" class="formula_controls">
                            <y-button class="formula_control" @click="autoFormula"><i class="fa-solid fa-plus"></i>
                                Сумма по всем вопросам
                            </y-button>
                            <!--              <y-input class="formula_control" placeholder="Добавить делитель" v-model.trim="formula_div"></y-input>-->
                        </div>
                    </div>
                    <div class="row center-button">
                        <y-cool-button v-if="editable" @click="saveTest">Сохранить тест</y-cool-button>
                    </div>
                </template>

                <div v-else class="questions__list">
                    <div class="state_1">Здесь будет отображаться список вопросов.
                        <span>Начните с создание нового вопроса</span>
                    </div>
                </div>

                <!--        <hr>
                        <y-test-type1 />
                        <hr>
                        <y-test-type2 />
                        <hr>-->

            </section>
        </template>

        <create-metric
                v-if="window === 'createMetric'"
                @close="createMetricClosed"
        ></create-metric>
    </y-modal>
</template>

<script>
import AddAnswers from "@/components/Test/AddAnswers";
import Question from '@/components/Test/Question';

import Metric from '@/api/admin/Metric';
import QuestionType from '@/api/admin/QuestionType';
import Test from '@/api/admin/Test'
import CreateMetric from "@/components/Test/Metrics/CreateMetric";
import YInput from "@/components/UI/YInput";
import mainConf, {ProjectState} from "../../../../main.conf";
import YLeftSideBar from "@/components/UI/YLeftSideBar.vue";

function update(data) {
  if (data.testId !== -1) {
    const test = new Test()
    test.get(data.testId)
      .then(res => {
        if (res.ok) {
          res.json().then(res => {
            const r = res.body;
            data.test.type = r.type.id
            data.test.title = r.title
            data.test.formula = r.formula.match('\\[\\+(.*)\\]')[1]
            data.formula_div = r.formula.match('.*\\/(.*)')[1]
            data.test.metric = r.metric.id
            r.questions = r.questions.map(el => {
              return {
                ...el,
                answers: JSON.parse(el.value)
              }
            })
            data.$store.commit('fillQuestions', r.questions)
          })
        } else {
          data.$store.commit('openErrorPopup', res.msg())
          if (mainConf.projectState === ProjectState.dev)
            console.log(res)
        }
      })
  }
  
  const metric = new Metric();
  metric.getAll()
    .then(res => {
      if (res.ok) {
        console.log(res);
        res.json().then(r => {
          data.metrics = r.body
          console.log(data.metrics);
        })
      } else {
        data.$store.commit('openErrorPopup', res)
      }
    })
  const types = new QuestionType();
  types.getOne()
    .then(res => {
      if (res.ok) {
        res.json().then(r => data.questionTypes = r.body.filter(el => el.id != 6 && el.id != 7))
      } else {
        data.$store.commit('openErrorPopup', res.msg())
      }
    })
}

export default {
  name: "CreateTest",
  components: {
    YLeftSideBar,
    YInput,
    CreateMetric,
    AddAnswers, Question
  },
  emits: ['close'],
  props: {
    testId: {
      type: Number,
      default: -1
    },
    title: {
      type: String,
      default: 'Новый тест'
    },
    editable: {
      type: Boolean,
      default: true
    },
    showSlideBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      window: 'main',
      questionTypes: [],
      metrics: [],
      formula_div: "",
      test: {
        type: null,
        title: null,
        formula: null,
        metric: null,
      },
    }
  },
  created() {
    this.$store.commit('clearNewTest');
    update(this)
  },
  methods: {
    openRemoveMetricPopUp(metricId) {
      console.log(metricId);
      this.$store.commit("openWarnPopup", {
        message: "Вы хотите удалить эту метрику?",
        acceptCallback: () => {
          const metric = new Metric();
          metric.remove(metricId).then(() => {
            this.updateMetricList();
            this.$store.commit('openPopup', "Метрика успешно удалена!")
          });
          
        }
      })
    },
    updateMetricList() {
      const metric = new Metric()
      metric.getAll()
        .then(res => {
          if (res.ok) {
            res.json().then(r => this.metrics = r.body)
          } else {
            this.$store.commit('openErrorPopup', res.msg())
          }
        })
    },
    createMetric() {
      this.window = 'createMetric';
      this.$router.push('/test/createMetric');
    },
    createMetricClosed() {
      this.window = 'main'
      this.updateMetricList();
      this.$router.push('/test/create')
    },
    autoFormula() {
      const formulaArr = []
      let i = 1;
      this.$store.getters.questions.map(() => {
        formulaArr.push("$" + i);
        i++;
      });
      this.test.formula = formulaArr.join("+");
    },
    close() {
      this.$emit('close')
      this.$store.commit('clearNewTest')
    },
    update() {
      update(this)
    },
    selectLabel(type, id) {
      if (this.questions.length > 0 && type === 'type') {
        this.$store.commit('openErrorPopup', 'Вы не можете изменят тип теста, если вопросы уже созданы с другим типом. Пожалуйста, начните составлять тест заново')
        return
      }
      this.test[type] = id
    },
    addQuestion() {
      let question = {}
      
      if (this.test.type !== 2) {
        question = {
          title: null,
          picture: null,
          answers: [],
          coins: null
        }
      } else {
        question = {
          title: null,
          picture: null,
          answers: [
            {
              id: 1,
              title: 'Да',
              value: null
            },
            {
              id: 2,
              title: 'Нет',
              value: null
            }
          ],
          coins: null
        }
      }
      
      this.$store.commit('addQuestion', {question, needCopy: this.test.type !== 2})
    },
    saveTest() {
      if (this.test.title.length < 4) {
        this.$store.commit('openErrorPopup', 'Слишком короткое название')
      }
      
      this.calculateFormulaDivision();
      
      const test = new Test()
      
      const body = JSON.parse(JSON.stringify(this.test))
      
      const formula = body.formula
      
      this.formula_div = (this.formula_div == "") ? 1 : parseInt(this.formula_div);
      
      if (test.shlypaMarkupValidation(`[+${formula}]/${this.formula_div}`)) {
        body.formula = `[+${formula}]/${this.formula_div}`
      } else {
        return this.$store.commit('openErrorPopup', 'Ошибка в формуле')
      }
      
      body.questions = this.questions
      
      let flag = false
      let i = 1;
      body.questions = body.questions.map((el, id) => {
        if (el.coins > 99099099) {
          this.$store.commit('openErrorPopup', `Слишком большое число монет в ${id} вопросе. Максимальное количество 99099099`)
          flag = true
        }
        el.answers = el.answers.map(el => {
          // el.id++;
          el.value = parseInt(el.value);
          return el;
        });
        el.relative_id = i;
        i++;
        el.coins = parseInt(el.coins);
        return {
          ...el,
          id: el.id ?? null
        }
      })
      if (flag) {
        return
      }
      
      if (this.testId !== -1) {
        test.update(this.testId, {id: this.testId, ...body})
          .then(res => {
            if (res.ok) {
              this.$store.commit('openPopup', 'Тест успешно изменён')
              this.$store.commit('clearNewTest')
              this.update()
            } else {
              this.$store.commit('openErrorPopup', res.msg())
            }
          })
      } else {
        body.questions = body.questions.map(quest => {
          const first = quest.answers[0].id;
          quest.answers = quest.answers.map(answ => {
            if (first == 0)
              answ.id++;
            return answ;
          })
          return quest;
        });
        test.create('', body)
          .then(res => {
            if (res.ok) {
              res.json().then(r => {
                this.$store.commit('openPopup', 'Тест успешно сохранён')
                this.$store.commit('clearNewTest')
                this.$emit('close', r.body.id)
              });
            } else {
              this.$store.commit('openErrorPopup', res.msg())
            }
          })
      }
    },
    removeQuestion(id) {
      this.$store.commit('removeQuestion', id)
    },
    calculateFormulaDivision() {
      let max = 0;
      this.$store.getters.questions.map(quest => {
        let maxInAnswers = 0;
        quest.answers.map(answ => {
          // If we get question where we can pick all answers we should sum all of them points
          if (this.test.type === 3) {
            maxInAnswers += parseInt(answ.value);
          } else {
            maxInAnswers = (answ.value > maxInAnswers) ? parseInt(answ.value) : maxInAnswers;
          }
        })
        max += maxInAnswers
      })
      this.formula_div = max;
    }
  },
  computed: {
    questions() {
      this.calculateFormulaDivision();
      return this.$store.getters.questions
    },
    coins() {
      let coins = 0
      this.questions.map(el => coins += Number(el.coins))
      return coins
    }
  }
}
</script>

<style scoped>
.center-button {
    width: 100%;
    display: flex;
    justify-content: center;
}

.header {
    display: flex;
    grid-template-columns: auto max-content;
    justify-content: flex-start;
    grid-gap: 1rem;
    align-items: center;
    border-bottom: 1px solid var(--border-dark);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    width: 100%;
}

.coins {
    display: grid;
    grid-template-columns: auto 1fr min-content;
    grid-gap: 0.5rem;
    align-items: center;
}

.main__input_coins {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 4rem;
    align-items: center;
    grid-gap: 1rem;

}

.type__test {
    margin-top: 70px;
    margin-bottom: 40px;
    display: flex;
    align-items: flex-start;
    justify-content: stretch;
    flex-wrap: wrap;
    flex-direction: column;
}

.types__test {
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
}

.type__test__title {
    font-size: 1rem;
    margin-right: .5rem;
    margin-bottom: 1rem;
}

.type__test__type {
    /*margin-right: .5rem;*/
    /*margin-bottom: .5rem;*/
}

.type__test__type:last-child {
    margin-right: 0;
}

.plus {
    margin-left: 10px;
    background: rgba(255, 255, 255, 0.17);
    border-radius: 7px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    width: 36px !important;
    line-height: 34px !important;
    font-size: 32px !important;
    height: auto;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;

}

.header__plus {
    display: flex;
    align-items: center;

}

.questions__list {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.state_1 {
    color: rgba(255, 255, 255, 0.66);
}

.state_1 span {
    color: #B275FF;
    text-decoration: underline;
    cursor: pointer;
}

hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    min-width: 30vw;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    border-top: 1px solid var(--border-light);
}

.ml-1 {
    margin-left: 1rem;
}

.w-50 {
    width: 50%;
}

.formula_controls {
    width: 50%;
    margin-top: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: row;
}

.formula_control {
    margin-right: 2rem;
    min-width: 15vw;
}

.input {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.input:hover {
    background: var(--acrylic-blur-light) !important;
    height: 3vh;
    width: 100%;
    text-align: left;
    padding-left: 2rem;
}

.questions {
    width: 100%;
}

.header__plus {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>

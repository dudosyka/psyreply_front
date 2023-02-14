<template>
  <article class="question">
    <span class="question__id">{{listId}}</span>
    <label>
      <h4 class="label">Заголовок вопроса</h4>
      <y-input :disabled="!editable" @input="giveData" v-model="question.title" />
    </label>
    <label>
      <h4 class="label">Монеты</h4>
      <y-input :disabled="!editable" @input="giveData" v-model="question.coins" />
    </label>
   <div class="question__title__add">
    <h4>Ответы</h4>
     <button @click="questionEditAnswers" class="question__add plus">+</button>
     <y-button v-if="editable" @click="$emit('remove')" class="question__del"><i class="fa-solid fa-trash"></i></y-button>
     <span v-else></span>
   </div>





    <add-answers
      :editable="editable"
      :questionId="questionId"
      v-if="popUp.show === true"
      @close="popUp.show = false"
    />
  </article>
</template>

<script>
import AddAnswers from '@/components/Test/AddAnswers';

export default {
  name: "QuestionType1",
  components: {
    AddAnswers
  },
  props: {
    questionId: Number,
    editable: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      popUp: {
        show: false
      },
    }
  },
  methods: {
    giveData() {
      this.$store.commit('editQuestion', {
        questionId: this.questionId,
        question: this.question
      })
    },
    questionEditAnswers() {
    //   console.log(this.questionId);
      this.popUp.show = true;
    }
  },
  computed: {
    listId() {
      const listId = this.questionId + 1
      return listId
    },
    question() {
      return this.$store.getters.question(this.questionId)
    }
  }
}
</script>

<style scoped>
.label {
  margin-bottom: 1rem;
  margin-left: 0.3rem;
}
.question {
  display: grid;
  grid-template-columns: 2vw 40vw auto auto;
  grid-gap: 1.3rem;
  align-items: center;
  margin-top: 1rem;
}
.question__id {
  font-size: 1.5rem;
}

.question__del {
  color: white;
  padding: 0.3rem;
  background: rgba(255, 0, 89, 1);
  border: 2px solid rgba(255, 255, 255, 0.4);
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
}
.question__del:hover {
  cursor: pointer;
}
.question__title__add{
  display: flex;
  padding-top: 2rem;
  flex-direction: row;
  align-items: center;
}
.question__add{
  width: min-content;
}
.plus{
  margin-left:10px ;
  background: rgba(255, 255, 255, 0.17);
  border-radius: 7px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  width: 32px;
  line-height: 28px;
  font-size: 28px;
  height: auto;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;
}
.input {
  background: var(--acrylic-blur-light)!important;
  height: 3vh;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
}
.input:hover {
  background: var(--acrylic-blur-light)!important;
  height: 3vh;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
}
</style>

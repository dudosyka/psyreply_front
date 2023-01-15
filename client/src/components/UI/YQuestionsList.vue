<template>
<div class="yqlist">
  <template v-for="(question, id) in questionData" :key="`${question.createdAt}${question.id}`">
    <y-question-item
      :test-arr-id="testArrId"
      :question-arr-id="questionArrId"
      :question-id="id"
    />
    <hr>
  </template>
</div>
</template>

<script>
export default {
  name: "YQuestionsList",
  props: {
    testArrId: Number,
    questionArrId: Number,
  },
  computed: {
    questionData() {
      const coordinates = {
        test_id: this.testArrId,
        question_id: this.questionArrId
      }
      return this.$store.getters.questionData(coordinates)
    }
  }
}
</script>

<style scoped>
hr {
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  min-width: 30vw;
  border-left: 0px solid white;
  border-right: 0px solid white;
  border-bottom: 0px solid white;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}
@media screen and (max-width:820px){
  .yqlist{
    display: grid;
    grid-gap: 0.5rem;
  }
}


</style>

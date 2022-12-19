<template>
  <question-type1
    v-if="type === 1 || type === 3 || type === 4 || type === 5"
    :question-id="questionId"
    @remove="$emit('remove')"
  />
  <question-type2
    v-else-if="type === 2"
    :question-id="questionId"
    @remove="$emit('remove')"
  />
  <hr>
</template>

<script>
import QuestionType1 from '@/components/Test/QuestionTypes/QuestionType1';
import QuestionType2 from '@/components/Test/QuestionTypes/QuestionType2';

export default {
  name: "question",
  components: {
    QuestionType1, QuestionType2
  },
  emits: ['remove'],
  props: [
    'questionId',
    'type'
  ],
}
</script>

<style scoped>
hr {
  margin-top: 30px;
  margin-bottom: 30px;
  min-width: 30vw;
  border-left: 0px solid white;
  border-right: 0px solid white;
  border-bottom: 0px solid white;
  border-top: 1px solid rgba(255, 255, 255, 0.52);
}
</style>

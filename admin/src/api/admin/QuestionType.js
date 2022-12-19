import Request from '@/api';

export default class QuestionType extends Request {
  constructor(id = 0) {
    super('question-type', id);
  }
}

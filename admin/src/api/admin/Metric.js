import Request from '@/api';

export default class Metric extends Request {
  constructor(id = 0) {
    super('metric', id);
  }
}

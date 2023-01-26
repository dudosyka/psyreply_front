import Request from '@/api';

export default class Metric extends Request {
  constructor(id = 0) {
    super('metric', id);
  }

  async create(name) {
    return this.execute("metric", "POST", {
      name
    }, res => res.json().then(data => data.body), err => err);
  }
}

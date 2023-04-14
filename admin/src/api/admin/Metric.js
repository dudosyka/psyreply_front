import Request from '@/api';

export default class Metric extends Request {
  constructor(id = 0) {
    super('metric', id);
  }
  
  async getAll() {
    return this.execute('metric/available', "GET", false, res => res, err => err)
  }
  
  async create(name, description) {
    return this.execute("metric", "POST", {
      name, description
    }, res => res.json().then(data => data.body), err => err);
  }
  
  async remove(metricId) {
    return await this.execute(`metric/${metricId}`, 'DELETE', false, res => res, err => err);
  }
}

import Request from '@/api'

export default class Results extends Request {
  constructor(id = 0) {
    super('result', id);
  }
  
  getStat(ids) {
    return this.execute('result/calculate/special', "POST", {ids}, res => res.json().then(data => data.body), err => err);
  }
}

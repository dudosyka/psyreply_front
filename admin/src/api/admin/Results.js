import Request from '@/api'

export default class Results extends Request {
  constructor(id = 0) {
    super('result', id);
  }
}

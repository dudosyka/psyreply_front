import Request from '@/api';

export default class Test extends Request {
  constructor(id = 0) {
    super('test', id);
  }

  addToBlock(blockId, body) {
    return this.create(`move/${blockId}`, body)
  }

  removeFromBlock(blockId, body) {
    return this.create(`remove/${blockId}`, body)
  }

  shlypaMarkupValidation(string) {
    return /^(\+((\$\d+)|(\(((\d+)|(\$\d+))[+*-]\$\d+\))|(\(\-?\$\d+\))))+$/.test(string)
  }
}

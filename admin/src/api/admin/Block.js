import Request from '@/api';

export default class Block extends Request {
  constructor(id) {
    super('block', id);
  }

  copyToCompany(companyId, body) {
    return this.create(`copy/${companyId}`, body)
  }

  remove(body) {
    return this.execute(`block`, 'DELETE', body,(res) => res, (err) => err)
  }

  async generateToken(block) {
    return await this.update(block.id, {
      week: block.week
    }).then(async r => {
      return await this.execute('block/hash', 'POST', { blockId: block.id, week: block.week }, res => res.text(), err => err);
    });
  }
}

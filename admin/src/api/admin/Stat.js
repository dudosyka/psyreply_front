import Request from "@/api";

export default class Stat extends Request {
  constructor() {
    super("/block/stat");
  }
  
  async saveWholeBlock(block_id, week) {
    return await this.execute(`block/stat/${block_id}/${week}`, 'POST', {}, res => res, err => err).then(res => {
      console.log(res);
    })
  }
  
  async saveGroup(block_id, week, group_id) {
    return await this.execute(`block/stat/${block_id}/${week}/${group_id}`, 'POST', {}, res => res, err => err).then(res => {
      console.log(res);
    })
  }
}
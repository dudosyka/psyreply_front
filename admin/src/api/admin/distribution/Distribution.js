import ApiResolver from "@/api/ApiResolver";

export class Distribution extends ApiResolver {
  constructor() {
    super('distribution');
  }
  
  async getAll() {
    return await this.request('', 'GET', null);
  }
  
  async getOne(id) {
    return await this.request(id, 'GET', null);
  }
  
  async create(data) {
    return await this.request('', 'POST', data);
  }
  
  async remove(id) {
    return await this.request(id, 'DELETE', null);
  }
  
  async update(id, data) {
    return await this.request(id, 'PATCH', data);
  }
}
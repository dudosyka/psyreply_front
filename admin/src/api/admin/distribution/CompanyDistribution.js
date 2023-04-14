import ApiResolver from "@/api/ApiResolver";

export class CompanyDistribution extends ApiResolver {
  constructor() {
    super('company-distribution');
  }
  
  async createBot({name, token}) {
    return await this.request('bot', 'POST', {name, token})
  }
  
  async updateBot({name, token, id}) {
    return await this.request(`bot/${id}`, 'PATCH', {name, token})
  }
}
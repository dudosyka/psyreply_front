import ApiResolver from "@/api/ApiResolver";

export default class CompanyName extends ApiResolver {
    constructor() {
        super('company')
    }
    async getCompanyName() {
        return await this.request('dash/get', 'GET');
    }
}
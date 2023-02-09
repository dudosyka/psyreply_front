import ApiResolver from "@/api/ApiResolver";

export default class CompanyName extends ApiResolver {
    constructor() {
        super('company')
    }
    async getCompanyName() {
        const re = this.request('dash/get', 'GET')
        console.log(re.body)
        return await this.request('dash/get', 'GET');
    }
}
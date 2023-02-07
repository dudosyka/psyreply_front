import ApiResolver from "@/api/ApiResolver";

export default class Company extends ApiResolver {
    constructor() {
        super('company')
    }

    async getGroups() {
        return await this.request('stat/groups', 'GET');
    }
}
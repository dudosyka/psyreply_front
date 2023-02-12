import ApiResolver from "@/api/ApiResolver";

export default class Company extends ApiResolver {
    constructor() {
        super('company')
    }

    async getGroups() {
        return await this.request('stat/groups', 'GET');
    }

    async getCompanyName() {
        return await this.request('dash/get', 'GET');
    }

    async getShare(groups){
        return await this.request('stat/share', 'POST', {groups})
    }
}
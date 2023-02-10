import ApiResolver from "@/api/ApiResolver";

export default class Stat extends ApiResolver {
    constructor() {
        super('company/stat');
    }

    getGroupStat(id) {
        return this.request(id, 'GET');
    }
    getGroupStatOld(id) {
        return this.request(`${id}/all`, 'GET');
    }
}
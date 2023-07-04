// import ApiResolver from "@/api/admin/greetings/ApiResolver";
import ApiResolver from "@/api/ApiResolver";

export class Greetings extends ApiResolver {
    constructor() {
        super('distribution/greetings');
    }

    async getGreeting() {
        return await this.request('get', 'GET');
    }

    async updateGreeting(id, data) {
        return await this.request(id, 'PATCH', data);
    }
}

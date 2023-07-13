import ApiResolver from "@/api/ApiResolver";

export class GetUserData extends ApiResolver {
    constructor() {
        super('user/client');
    }

    async getProfile() {
        return await this.request('profile', 'GET', null);
    }
}

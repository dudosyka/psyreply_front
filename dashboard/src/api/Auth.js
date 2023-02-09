import ApiResolver from "@/api/ApiResolver";

export default class Auth extends ApiResolver {
    constructor() {
        super('auth');
    }

    async auth(email, password) {
        console.log('complete')
        return await this.unauthenticatedRequest('dash', 'POST', { email, password }).then(body => body.token);
    }
}
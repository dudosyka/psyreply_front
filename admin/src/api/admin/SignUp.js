import ApiResolver from "@/api/ApiResolver";

export default class SignUp extends ApiResolver {
    constructor() {
        super('auth')
    }
    async signUp(data){
        return await this.request('signup', 'POST', data)
    }
}
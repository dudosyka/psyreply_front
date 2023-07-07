import ApiResolver from "@/api/ApiResolver";

export class Greetings extends ApiResolver {
    constructor() {
        super('distribution/greetings');
    }

    async sendGreeting(chatId, botId) {
        return await this.request(`send/${chatId}/${botId}`, 'GET');
    }
}

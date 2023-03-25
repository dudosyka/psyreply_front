import {BaseModel} from "@/api/models/base.model";
import {BotModelDto} from "@/api/dto/bot-model.dto";
import {NotFoundException} from "@/api/exceptions/not-found.exception";
import {UserModelDto} from "@/api/dto/user-model.dto";
import {MessageModelDto} from "@/api/dto/message-model.dto";

export class BotModel extends BaseModel {
  constructor() {
    super("bot");
  }

  async getCurrent(): Promise<BotModelDto> {
    const botModels: { body: BotModelDto[] } = await this.apiResolver.request("GET");

    if (botModels.body.length) {
      return botModels.body[0]
    } else {
      throw new NotFoundException<BotModel>(this)
    }
  }

  async getSubscribers(botId: number): Promise<UserModelDto[]> {
    const res: { body: UserModelDto[] } = await this.apiResolver.request("GET", `${botId}/subs`)

    return res.body;
  }

  async getHistory(botId: number, userId: number): Promise<MessageModelDto[]> {
    const res: { body: MessageModelDto[] } = await this.apiResolver.request("GET", `${botId}/chat/${userId}`);

    return res.body;
  }
}

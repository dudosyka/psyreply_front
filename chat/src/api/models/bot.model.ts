import {BaseModel} from "@/api/models/base.model";
import {BotModelDto} from "@/api/dto/bot-model.dto";
import {NotFoundException} from "@/api/exceptions/not-found.exception";
import {UserModelDto} from "@/api/dto/user-model.dto";
import {ChatModelDto} from "@/api/dto/chat-model.dto";
import {ChatBotModelDto} from "@/api/dto/chat-bot-model.dto";
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

  async getSubscribers(): Promise<ChatModelDto[]> {
    const res: { body: ChatModelDto[] } = await this.apiResolver.request("GET", `subs`).then(r => {
      return {
        body: r.body.map((el: { id: number, user: UserModelDto, bot_chat: ChatBotModelDto }) => ({
          id: el.id,
          userModel: el.user,
          chatBotModel: el.bot_chat
        }))
      };
    });

    return res.body;
  }

  async getHistory(chatId: number): Promise<MessageModelDto[]> {
    const res: { body: MessageModelDto[] } = await this.apiResolver.request("GET", `${chatId}/history`);

    return res.body;
  }
}

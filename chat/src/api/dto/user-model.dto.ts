import {BotUserModelDto} from "@/api/dto/bot-user-model.dto";

export type UserModelDto = {
  id: number,
  jetBotId: number,
  login: string,
  avatar: string,
  coins: number,
  group_id: number | null,
  createdAt: string,
  updatedAt: string,
  BotUserModel: BotUserModelDto
}

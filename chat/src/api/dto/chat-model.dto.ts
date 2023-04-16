import {UserModelDto} from "@/api/dto/user-model.dto";
import {ChatBotModelDto} from "@/api/dto/chat-bot-model.dto";

export type ChatModelDto = {
  id: number;
  chatBotModel: ChatBotModelDto;
  userModel: UserModelDto;
}

import {ChatInfoDto} from "@/api/dto/chat-info.dto";
import {UserModelDto} from "@/api/dto/user-model.dto";
import {ChatMessageModelDto} from "@/api/dto/chat-message-model.dto";

export type SelectedChatDto = {
  user: UserModelDto,
  messages: ChatMessageModelDto[],
  info: ChatInfoDto
}

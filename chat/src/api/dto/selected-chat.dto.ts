import {MessageModelDto} from "@/api/dto/message-model.dto";
import {ChatInfoDto} from "@/api/dto/chat-info.dto";
import {UserModelDto} from "@/api/dto/user-model.dto";

export type SelectedChatDto = {
  user: UserModelDto,
  messages: MessageModelDto[],
  info: ChatInfoDto
}

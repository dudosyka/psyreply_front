import {ChatInfoDto} from "@/api/dto/chat-info.dto";
import {UserModelDto} from "@/api/dto/user-model.dto";
import {MessageModelDto} from "@/api/dto/message-model.dto";

export type SelectedChatDto = {
  user: UserModelDto,
  messages: MessageModelDto[],
  info: ChatInfoDto
}

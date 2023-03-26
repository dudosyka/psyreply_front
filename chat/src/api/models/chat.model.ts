import {WsResolverUtil} from "@/api/utils/ws-resolver.util";
import {ContactDtoList} from "@/api/dto/contact.dto";
import {BaseModel} from "@/api/models/base.model";
import {ChatInfoDto} from "@/api/dto/chat-info.dto";
import {store,key} from "@/store/store";
import {UserModelDto} from "@/api/dto/user-model.dto";
import {MessageModelDto} from "@/api/dto/message-model.dto";
import {TimestampParserUtil} from "@/api/utils/timestamp-parser.util";


export class ChatModel extends BaseModel {
  socket: WsResolverUtil;
  constructor() {
    super("chat")
    const token =  localStorage.getItem("token");
    this.socket = new WsResolverUtil("http://localhost:8080", token ? token : "");
    this.socket.on("connect", function () {
      console.log("Connected!");
    })

    this.socket.on("newMessage", this.newMessage)
  }

  private newMessage(data: any) {
    const dto = {
      ...data.body
    };
    store.commit("pushMessages", [dto])
  }

  async sendMessage(text: string, attachments: number[] = [], type_id: number = 1) {
    const selectedChat: UserModelDto = store.getters.selectedContact;
    this.socket.emit(
      "sendMessage",
      {
              chatId: selectedChat.BotUserModel.chat_id,
              msg: {
                text,
                attachments,
                type_id
              },
              botUserId: selectedChat.BotUserModel.id
            },
            function (res) {
              if (res.status == 201)
                store.commit("pushMessages", [res.body])
            }
          );
  }

  async subscribe(chatId: number) {
    this.socket.emit('subscribe_chat', { chatId: chatId.toString() })
  }

  async getChatInfo(botUserId: number): Promise<ChatInfoDto> {
    const res: { body: ChatInfoDto } = await this.apiResolver.request("GET", `${botUserId}/info`);

    return res.body;
  }

  insertDateSteps(messages: MessageModelDto[]): any[] {
    if (!messages.length)
      return [];
    let lastPushed = (new TimestampParserUtil(messages[0].createdAt)).getDayNum();
    const result = [];
    result.push({
      type: "date",
      value: (new TimestampParserUtil(messages[0].createdAt)).getMessageFormatDate()
    });
    messages.map((el, index) => {
      if (index == 0) {
        result.push({type: 'msg', value: el})
        return;
      }

      const curDay = (new TimestampParserUtil(el.createdAt));
      if (lastPushed != curDay.getDayNum()) {
        result.push({
          type: "date",
          value: (new TimestampParserUtil(el.createdAt)).getMessageFormatDate()
        })
        lastPushed = curDay.getDayNum();
      }
      result.push({type: 'msg', value: el})
    })

    return result;
  }
}

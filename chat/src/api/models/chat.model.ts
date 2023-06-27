import {WsResolverUtil} from "@/api/utils/ws-resolver.util";
import {BaseModel} from "@/api/models/base.model";
import {ChatInfoDto} from "@/api/dto/chat-info.dto";
import {store} from "@/store/store";
import {TimestampParserUtil} from "@/api/utils/timestamp-parser.util";
import {ChatModelDto} from "@/api/dto/chat-model.dto";
import {MessageModelDto} from "@/api/dto/message-model.dto";
import apiConf from "@/api/api.conf";


export class ChatModel extends BaseModel {
  socket: WsResolverUtil | null = null;
  constructor() {
    super("chat")
  }

  private newMessage(data: any) {
    const dto = {
      ...data.body
    };
    console.log(dto);
    store.commit("pushMessages", [dto])
  }

  async sendMessage(text: string, attachments: number[] = [], type_id: number = 1) {
    const selectedChat: ChatModelDto = store.getters.selectedContact;
    if (this.socket)
      this.socket.emit(
        "sendMessage",
        {
                chatId: selectedChat.chatBotModel.telegram_chat_id,
                msg: {
                  title: "null",
                  text,
                  attachments,
                  type_id
                },
                chatModelId: selectedChat.id,
              },
              function (res) {
                console.log(res);
                if (res.status == 201)
                  store.commit("pushMessages", [res.body])
              }
            );
  }

  async subscribe(chatId: number) {
    const token =  localStorage.getItem("token");
    if (this.socket)
      this.socket.close();
    this.socket = new WsResolverUtil(apiConf.url, token ? token : "");
    this.socket.on("connect", function () {
      console.log("Connected!");
    })

    this.socket.on("newMessage", this.newMessage)
    this.socket.emit('subscribe_chat', { chatId: chatId.toString() })
  }

  async getChatInfo(chatId: number): Promise<ChatInfoDto> {
    const res: { body: ChatInfoDto } = await this.apiResolver.request("GET", `${chatId}`);

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

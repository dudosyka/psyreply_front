import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore} from "vuex";
import {BotModel} from "@/api/models/bot.model";
import apiConf from "@/api/api.conf";
import {UserModelDto} from "@/api/dto/user-model.dto";
import {ChatModel} from "@/api/models/chat.model";
import {MessageModelDto} from "@/api/dto/message-model.dto";
import {BotModelDto} from "@/api/dto/bot-model.dto";
import {SelectedChatDto} from "@/api/dto/selected-chat.dto";
import {NoteModelDto} from "@/api/dto/note-model.dto";
import {UserModel} from "@/api/models/user.model";

// define your typings for the store state
export interface State {
  token: string,
  contacts: UserModelDto[],
  currentBot: BotModelDto | null,
  selectedChat: SelectedChatDto | null,
  chatModel: ChatModel
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    token: "",
    contacts: [],
    currentBot: null,
    selectedChat: null,
    chatModel: new ChatModel()
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
    chatModel(state) {
      return state.chatModel
    },
    messages(state) {
      if (state.selectedChat == null)
        return [];
      return state.selectedChat.messages;
    },
    selectedContact: state => state.selectedChat ? state.selectedChat.user : {},
    selectedContactInfo: state => state.selectedChat ? state.selectedChat.info : {},
    selectedContactInfoNotes: state => state.selectedChat ? state.selectedChat.info.notes : [],
    chatMessages(state) {
      return state.chatModel.insertDateSteps(state.selectedChat ? state.selectedChat.messages : [])
    }
  },
  mutations: {
    setContacts(state, contacts) {
      state.contacts = contacts
    },
    setCurBot(state, currentBot) {
      state.currentBot= currentBot
    },
    selectChat(state, selectedChatDto: SelectedChatDto) {
      state.selectedChat = selectedChatDto;
    },
    pushMessages(state, messages: MessageModelDto[]) {
      if (state.selectedChat)
        state.selectedChat.messages.push(...messages)
    },
    pushNote(state, note: NoteModelDto) {
      if (state.selectedChat) {
        state.selectedChat.info.notes.push(note)
      }
    }
  },
  actions: {
    async loadApplication({ commit }) {
      const botModel = new BotModel();
      const curBot = await botModel.getCurrent().catch(() => {
        alert("Ошибка! Добавьте способ доставки в личном кабинете!")
        return null;
      });

      if (curBot == null)
        return;

      commit('setCurBot', curBot);

      const contacts = (await botModel.getSubscribers(curBot.id)).map(el => {
        el.avatar = `${apiConf.url}/files/stream/${el.avatar}`

        return el;
      })

      commit('setContacts', contacts)
    },
    async selectChat({ commit, state }, selectedContact: UserModelDto) {
      const botModel = new BotModel();
      const userModel = new UserModel();

      const history = (await botModel.getHistory(selectedContact.BotUserModel.bot_id, selectedContact.id)).map(el => {
        const content = `${el.message.content}`;

        if (typeof el.message.content == "object")
          return el.message;
        else if (content.length)
          el.message.content = JSON.parse(el.message.content)
        else
          el.message.content = { attachments: [], text: "" }

        return el.message;
      })

      const info = await state.chatModel.getChatInfo(selectedContact.BotUserModel.id)
      info.link = await userModel.getLink(selectedContact.jetBotId);

      await state.chatModel.subscribe(selectedContact.BotUserModel.chat_id)

      commit('selectChat', { messages: history, info, user: selectedContact });
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}

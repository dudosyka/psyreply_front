import {InjectionKey} from 'vue'
import {createStore, Store, useStore as baseUseStore} from "vuex";
import {BotModel} from "@/api/models/bot.model";
import apiConf from "@/api/api.conf";
import {ChatModel} from "@/api/models/chat.model";
import {MessageModelDto} from "@/api/dto/message-model.dto";
import {BotModelDto} from "@/api/dto/bot-model.dto";
import {SelectedChatDto} from "@/api/dto/selected-chat.dto";
import {NoteModelDto} from "@/api/dto/note-model.dto";
import {UserModel} from "@/api/models/user.model";
import {ChatModelDto} from "@/api/dto/chat-model.dto";

// define your typings for the store state
export interface State {
  token: string,
  contacts: ChatModelDto[],
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
    bot(state) {
      return state.currentBot;
    },
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
      console.log(state.selectedChat);
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
      console.log(messages, state.selectedChat);
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
      const curBot = await botModel.getCurrent();

      console.log(curBot);

      if (curBot == null)
        return;

      commit('setCurBot', curBot);

      const contacts = (await botModel.getSubscribers()).map(el => {
        el.userModel.avatar = `${apiConf.url}/files/stream/${el.userModel.avatar}`
        return el;
      })

      console.log(contacts);

      commit('setContacts', contacts)
    },
    async selectChat({ commit, state }, selectedContact: ChatModelDto) {
      const botModel = new BotModel();
      const userModel = new UserModel();

      const history = (await botModel.getHistory(selectedContact.id)).map(el => {
        const content = `${el.content}`;

        console.log(el);

        if (typeof el.content == "object")
          return el;
        else if (content.length)
          el.content = JSON.parse(el.content)
        else
          el.content = { attachments: [], text: "" }

        return el;
      })

      const info = await state.chatModel.getChatInfo(selectedContact.id)
      info.link = await userModel.getLink(selectedContact.userModel.jetBotId);

      await state.chatModel.subscribe(selectedContact.chatBotModel.telegram_chat_id)

      commit('selectChat', { messages: history, info, user: selectedContact });
    }
  }
})

export function useStore () {
  return baseUseStore(key)
}

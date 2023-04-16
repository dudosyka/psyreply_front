<template>
  <v-row :class="{'message-out-row': !!messageModel.direction && !oneSide, 'message-in-row': !messageModel.direction}">
    <v-alert
      class="message"
      :class="{'message-out': !!messageModel.direction && !oneSide, 'message-in': !messageModel.direction}"
    >
      <v-row class="message-row">
        <v-col class="message-col">
          <template
            v-if="messageModel.content"
          >
            <template
              :key="`${Date.now()}img${attached.link}`"
              v-for="attached in messageModel.content.attachments"
            >
              <v-img
                v-if="!attached.type || attached.type == 0"
                :src="AttachmentLoaderUtil.load(attached.link)"
                :lazy-src="AttachmentLoaderUtil.load(attached.link)"
                :width="1000"
                aspect-ratio="1"
                @click="openFullScreen(attached.link[0])"
              />
              <!-- SIMPLE LINK -->
              <template
                v-else-if="attached.type == 1"
              >
                <v-btn class="mb-3" @click="goByLink(attached.link)" > Ссылка </v-btn>
              </template>

              <!-- BLOCK LINK -->
              <template
                v-else-if="attached.type == 2"
              >
                <p class="font-italic mb-2">
                  Ссылка на блок тестирования
                </p>
                <hr class="w-75 mb-2 ml-auto mr-auto">
              </template>
            </template>
          </template>
          <p class="message-text" v-html="messageParser(messageModel.text)"></p>
        </v-col>
        <v-col class="time-col">
          <span class="time-text">{{ (new TimestampParserUtil(messageModel.createdAt)).getMessageFormatTime() }}</span>
        </v-col>
      </v-row>
    </v-alert>
  </v-row>
</template>

<script>
import {TimestampParserUtil} from "@/api/utils/timestamp-parser.util";
import {AttachmentLoaderUtil} from "@/api/utils/attachment-loader.util";
import {LinkifyUtil} from "@/utils/linkify.util";

export default {
  name: "RMessageBlob",
  computed: {
    AttachmentLoaderUtil() {
      return AttachmentLoaderUtil
    },
    TimestampParserUtil() {
      return TimestampParserUtil
    }
  },
  props: {
    messageModel: {
      type: Object,
      default: () => {}
    },
    oneSide: {
      type: Boolean,
      default: () => false,
    }
  },
  methods: {
    openFullScreen(url) {
      window.open(url, "_blank")
    },
    goByLink(link) {
      window.open(link, "_blank")
    },
    messageParser(msg) {
      if (!msg)
        return "";
      return LinkifyUtil.linkifyMessage(msg);
    }
  }
}
</script>

<style scoped>
.time-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.47);
}
.message-text {
  width: auto;
  max-width: 20rem;
  text-align: left;
}
.time-col {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0;
}
.message-row {
  display: flex;
  justify-content: flex-start;
  width: 19vw;
  max-width: 30vw;
  flex-direction: column;
}
.message-in-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem!important;
}
.message-out-row {
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem!important;
}
.message {
  max-width: 20vw;
  padding: 0.6rem;
  min-width: 21vw;
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
}
.message-in {
  color: white;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-image: linear-gradient(15deg, #cc208e 0%, #6713d2 100%);
  border: 2px solid rgba(209, 213, 219, 0.3);
}
.message-out {
  background-color: rgba(7, 10, 17, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
</style>

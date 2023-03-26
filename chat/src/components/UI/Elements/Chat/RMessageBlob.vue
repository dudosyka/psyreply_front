<template>
  <v-row :class="{'message-out-row': !!messageModel.bot_message_id && !oneSide, 'message-in-row': !messageModel.bot_message_id}">
    <v-alert
      class="message"
      :class="{'message-out': !!messageModel.bot_message_id && !oneSide, 'message-in': !messageModel.bot_message_id}"
    >
      <v-row class="message-row">
        <v-col class="message-col">
          <template
            v-if="messageModel.content"
          >
            <v-img
              :key="`${Date.now()}img${attached.link}`"
              v-for="attached in messageModel.content.attachments"
              :src="AttachmentLoaderUtil.load(attached.link)"
              :lazy-src="AttachmentLoaderUtil.load(attached.link)"
              :width="1000"
              aspect-ratio="1"
              @click="openFullScreen(attached.link[0])"
            />
          </template>
          <p class="message-text">{{
              messageModel.text
            }}</p>
        </v-col>
        <v-col class="time-col">
          <span class="time-text">{{ (new TimestampParserUtil(messageModel.createdAt)).getMessageFormatTime() }}</span>
        </v-col>
      </v-row>
    </v-alert>
  </v-row>
</template>

<script>
import {TimestampParserUtil} from "../../../../api/utils/timestamp-parser.util";
import {AttachmentLoaderUtil} from "@/api/utils/attachment-loader.util";

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

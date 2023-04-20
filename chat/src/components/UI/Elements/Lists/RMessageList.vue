<template>
  <v-container class="chat-container">
    <r-updatable-container @updated="updateScroll" @created="updateScroll(5000)">
      <v-container class="message-area" ref="msg-area">
        <template :key="`${Date.now()}${item.type}${index}`" v-for="(item, index) in messages">
          <r-date-chip v-if="item.type == 'date'" :value="item.value"></r-date-chip>
          <r-message-blob :one-side="oneSide" v-else :message-model="item.value"><slot></slot></r-message-blob>
        </template>
      </v-container>
    </r-updatable-container>
    <v-container class="textarea-container" v-if="showInput">
      <v-divider class="hr"></v-divider>
      <v-row class="input-area">
        <input ref="inputFile" type="file" style="display: none;" @change="fileSelected"/>
        <r-button v-if="showControls" :icon="'mdi-paperclip'" class="controls" @click="selectFile"></r-button>
        <r-text-input @keyup.enter.prevent="sendMessage" :placeholder="'Сообщение'" v-model="text"></r-text-input>
        <r-button v-if="showControls" :icon="'mdi-microphone'" class="controls"></r-button>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import RDateChip from "@/components/UI/Elements/Chat/RDateChip.vue";
import RMessageBlob from "@/components/UI/Elements/Chat/RMessageBlob.vue";
import RButton from "@/components/UI/Elements/Buttons/RButton.vue";
import RTextInput from "@/components/UI/Elements/Inputs/RTextInput.vue";
import RUpdatableContainer from "@/components/RUpdatableContainer.vue";
import {FilesModel} from "@/api/models/files.model";

export default {
  name: "RMessageList",
  components: {RUpdatableContainer, RTextInput, RButton, RMessageBlob, RDateChip},
  props: {
    showInput: {
      type: Boolean,
      default: () => false
    },
    messages: {
      type: Array,
      default: () => []
    },
    oneSide: {
      type: Boolean,
      default: () => false
    },
    showControls: {
      type: Boolean,
      default: () => true,
    }
  },
  emits: {
    send: {}
  },
  data: () => ({
    text: "",
    file: null,
    fileUploading: false,
    attachments: []
  }),
  methods: {
    sendMessage(event) {
      if (event.shiftKey) {
        return;
      }

      this.text = this.text.trim()

      if (!this.attachments.length && !this.text) {
        return false;
      }

      if (!this.fileUploading) {
        this.$emit('send', { msg: this.text, attachments: this.attachments });
        this.text = "";
        this.attachments = [];
      }
    },
    updateScroll(delay = 1) {
      if (this.$refs["msg-area"]) {
        setTimeout(() => {
          console.log('scrolled');
          this.$refs['msg-area'].$el.scrollTo({
            behavior: 'smooth',
            top: this.$refs['msg-area'].$el.scrollHeight * 3
          });
        }, delay)
      }
    },
    selectFile() {
      this.$refs.inputFile.click();
      this.fileUploading = true;
    },
    async fileSelected(file) {
      console.log(file);
      const filesModel = new FilesModel();
      const uploaded = await filesModel.upload(file.target.files[0]);
      this.attachments = [uploaded.id];
      this.fileUploading = false;
    }
  },
  watch: {
    messages(newValue) {
      this.updateScroll()
    }
  }
}
</script>

<style scoped>
.input-area {
  margin-top: 1rem;
}
.voice-record {
  display: none!important;
}
.v-input__details {
  display: none!important;
}
.chat-container {
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.message-area {
  display: flex;
  max-height: 59vh;
  flex-direction: column;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.textarea-container {
  padding: 2rem 1rem 0 1rem;
}
.v-alert__content {
  padding: 1.5rem;
}
.controls {
  margin-top: 0 !important;
}
</style>

<template>
  <v-container class="chat-container">
    <r-updatable-container @updated="updateScroll" @created="updateScroll">
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
        <r-button></r-button>
        <r-text-input :placeholder="'Сообщение'" v-model="text"></r-text-input>
        <r-button @click="sendMessage"></r-button>
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
    }
  },
  emits: {
    send: {}
  },
  data: () => ({
    text: ""
  }),
  methods: {
    sendMessage() {
      this.$emit('send', { msg: this.text });
      this.text = "";
    },
    updateScroll(delay = 1) {
      if (this.$refs["msg-area"]) {
        setTimeout(() => {
          console.log('scrolled');
          this.$refs['msg-area'].$el.scrollTo({
            behavior: 'smooth',
            top: this.$refs['msg-area'].$el.scrollHeight
          });
        }, delay)
      }
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
  scroll-behavior: smooth;
}
.textarea-container {
  padding: 2rem 1rem 0 1rem;
}
.v-alert__content {
  padding: 1.5rem;
}
</style>

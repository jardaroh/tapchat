<template>
  <div v-if="chat" class="ChatWrapper" @click="message = ''; chat = null">
    <div class="ChatWindow" @click.stop>
      <div class="header">{{ chat.participants.them.username }}</div>
      <div class="body">
        <div class="messageWrapper">
          <div v-for="(msg, i) in messages"
               :key="i"
               class="chatMessage"
          >
            <div :class="{
              right: msg.from === chat.participants.me.username,
              left: msg.from === chat.participants.them.username,
            }">
              {{ msg.message }}
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <label>
          <input type="text"
                 :placeholder="`write a message to ${chat.participants.them.username}`"
                 v-model="message"
                 @keydown.enter="send"
          >
        </label>
        <button @click="send">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useChat from '@/composition/useChat';

export default {
  setup() {
    const {
      chat,
      messages,
      sendMessage,
    } = useChat();
    const message = ref('');

    const send = () => {
      sendMessage(message.value);
      message.value = '';
    };

    return {
      chat,
      message,
      messages,
      send,
    };
  },
};
</script>

<style lang="scss">
.ChatWrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: #0008;

  .ChatWindow {
    position: absolute;
    min-width: 40rem;
    max-width: 80vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow:
      8px 8px 8px #0002,
      -8px -8px 8px #0002,
      -8px 8px 8px #0002,
      8px -8px 8px #0002
    ;
    .header {
      background: var(--blue-darker);
      color: #fff;
      padding: 1rem;
      text-transform: uppercase;
    }
    .body {
      height: 60vh;
      padding: 1rem;
      overflow-y: scroll;
      background: #fff;
    }
    .footer {
      display: grid;
      grid-template-columns: auto max-content;
      background: var(--blue-darker);
      padding: 0.5rem;
      gap: 0.5rem;
      input {
        width: 100%;
      }
    }
    .messageWrapper {
      .chatMessage {
        clear: both;
        &>div {
          padding: 1rem;
          margin: 0 0 1rem 0;
        }
        .left {
          float: left;
          background: var(--blue-light);
          border-radius: 1rem 1rem 1rem 0;
        }
        .right {
          float: right;
          background: var(--gray);
          border-radius: 1rem 1rem 0 1rem;
        }
      }
    }
  }
}
</style>

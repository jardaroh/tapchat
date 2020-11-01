<template>
  <div v-if="chat" class="ChatWrapper" @click="chat = null">
    <div class="ChatWindow" @click.stop>
      <div class="header">{{ chat.participants.them.username }}</div>
      <div class="body"></div>
      <div class="footer">
        <label>
          <input type="text"
                 :placeholder="`write a message to ${chat.participants.them.username}`"
          >
        </label>
        <button>Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import useChat from '@/composition/useChat';

export default {
  setup() {
    const { chat } = useChat();

    return {
      chat,
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
  }
}
</style>

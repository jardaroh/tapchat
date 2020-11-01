<template>
  <div v-if="chat" class="ChatWrapper" @click="chat = null">
    <div class="ChatWindow" @click.stop>
      hello
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
  }
}
</style>

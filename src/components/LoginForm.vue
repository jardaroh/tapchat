<template>
  <div class="LoginForm">
    <label for="LoginInput">Username</label>
    <input ref="input" id="LoginInput" type="text" @keydown.enter="signIn">
    <button @click="signIn">Sign in</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import useSocket from '@/composition/useSocket';
import useUser from '@/composition/useUser';

export default {
  setup() {
    const { socket, EVENTS } = useSocket();
    const { signedInUser } = useUser();
    const input = ref(null);

    socket.on(EVENTS.IDENTIFICATION, () => {
      socket.emit(EVENTS.IDENTIFICATION, signedInUser.value);
    });

    const signIn = () => {
      signedInUser.value = { username: input.value.value };
      socket.emit(EVENTS.IDENTIFICATION_INIT);
    };

    return {
      input,
      signIn,
    };
  },
};
</script>

<style lang="scss">
.LoginForm {
  position: absolute;
  display: grid;
  grid-template-columns: max-content max-content;
  gap: 1rem;
  place-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  * {
    line-height: 1rem;
  }
  button {
    grid-column: 1 / span 2;
    width: 100%;
  }
}
</style>

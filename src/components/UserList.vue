<template>
  <div>
    <div v-for="(user, i) in users" :key="i">{{ user.username }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';
import useSocket from '../composition/useSocket';

export default {
  setup() {
    const users = ref([]);
    const { socket, EVENTS } = useSocket();

    socket.on(EVENTS.USER_CONNECT, (data) => {
      const foundUser = users.value.find((u) => u.username === data.username);
      if (!foundUser) {
        users.value.push(data);
      }
    });

    return {
      users,
    };
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 15rem;
  padding: 1rem;
  &>div {
    padding: 0 0 0.5rem 0;
  }
}
</style>

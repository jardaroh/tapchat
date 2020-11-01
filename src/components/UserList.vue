<template>
  <div class="UserList">
    <div v-for="(user, i) in users"
         :key="i"
         class="userItem"
         @click="openChat(user)"
    >
      <div class="username">{{ user.username }}</div>
      <span class="hover">open chat</span>
      <span class="count">1</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import useChat from '@/composition/useChat';
import useSocket from '../composition/useSocket';

const users = ref([]);
const getUsers = async () => {
  const result = await axios.get('/api/users');
  users.value = result.data;
};

export default {
  setup() {
    const { socket, EVENTS } = useSocket();
    const { openChat } = useChat();

    socket.on(EVENTS.USER_CONNECT, (data) => {
      const foundUser = users.value.find((u) => u.username === data.username);
      if (!foundUser) {
        users.value.push(data);
      }
    });

    socket.on(EVENTS.USER_DISCONNECT, (data) => {
      const userIndex = users.value.findIndex((user) => user.username === data.username);
      users.value.splice(userIndex, 1);
    });

    getUsers();

    return {
      users,
      openChat,
    };
  },
};
</script>

<style lang="scss" scoped>
div.UserList {
  width: 15rem;
  padding: 1rem;
  &>div.userItem {
    display: grid;
    grid-template-columns: auto max-content max-content;
    gap: 0.5rem;
    padding: 0 0 0.5rem 0;
    cursor: pointer;
    .hover {
      opacity: 0;
    }
    &:hover>.hover {
      opacity: 0.5;
    }
  }
}
</style>

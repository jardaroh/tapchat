import { shallowRef } from 'vue';
import axios from 'axios';
import useUser from '@/composition/useUser';
import useSocket from '@/composition/useSocket';

const chat = shallowRef(null);
const messages = shallowRef([]);
const { socket, EVENTS } = useSocket();
const { signedInUser, users } = useUser();

const handleChatMessage = (data) => {
  if (!chat.value) {
    const user = users.value.find((u) => u.username === data.from);
    if (user) {
      user.newMessageCount = user.newMessageCount ? user.newMessageCount += 1 : 1;
    }
    return;
  }
  messages.value = [...messages.value, data];
};

const openChat = async (them) => {
  const roomName = [signedInUser.value.username, them.username]
    .sort((a, b) => (a > b ? 1 : -1))
    .join('-');
  const result = await axios.get(`/api/messages/${roomName}`);
  if (result.status === 200) {
    messages.value = result.data;
  } else {
    messages.value = [];
  }
  chat.value = {
    roomName,
    participants: { me: signedInUser.value, them },
  };

  socket.on(EVENTS.MESSAGE_FROM_USER, handleChatMessage);

  (users.value.find((u) => u.username === them.username) || {}).newMessageCount = 0;
};

const sendMessage = (message) => {
  const data = {
    to: chat.value.participants.them.username,
    from: chat.value.participants.me.username,
    roomName: chat.value.roomName,
    message,
  };
  messages.value.push(data);
  socket.emit(EVENTS.MESSAGE_TO_USER, data);
};

export default () => ({
  chat,
  messages,
  openChat,
  handleChatMessage,
  sendMessage,
});

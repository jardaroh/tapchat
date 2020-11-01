import { shallowRef } from 'vue';
import useUser from '@/composition/useUser';
import useSocket from '@/composition/useSocket';

const chat = shallowRef(null);
const messages = shallowRef([]);
const { socket, EVENTS } = useSocket();

const handleChatMessage = (data) => {
  messages.value = [...messages.value, data];
};

const openChat = (them) => {
  const { signedInUser } = useUser();
  const roomName = [signedInUser.value.username, them.username]
    .sort((a, b) => (a > b ? 1 : -1))
    .join('-');
  chat.value = {
    roomName,
    participants: { me: signedInUser.value, them },
  };

  socket.on(EVENTS.MESSAGE_FROM_USER, handleChatMessage);
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

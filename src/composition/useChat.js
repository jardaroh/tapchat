import { shallowRef } from 'vue';
import useUser from '@/composition/useUser';

const chat = shallowRef(null);
const messages = shallowRef([]);

const openChat = (them) => {
  const { signedInUser } = useUser();
  const roomName = [signedInUser.username, them.username]
    .sort((a, b) => (a > b ? 1 : -1))
    .join('-');
  chat.value = {
    roomName,
    participants: { signedInUser, them },
  };
};

export default () => ({
  chat,
  messages,
  openChat,
});

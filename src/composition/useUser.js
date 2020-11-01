import { ref, watch } from 'vue';

const SIGNED_IN_USER = 'signedInUser';
const signedInUser = ref(localStorage.getItem(SIGNED_IN_USER));

watch(signedInUser, () => {
  if (signedInUser.value) {
    localStorage.setItem(SIGNED_IN_USER, JSON.stringify(signedInUser.value));
  } else {
    localStorage.removeItem(SIGNED_IN_USER);
  }
});

export default () => ({
  signedInUser,
});

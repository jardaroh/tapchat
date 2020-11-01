import { ref, watch } from 'vue';

const SIGNED_IN_USER = 'signedInUser';
const signedInUser = ref(JSON.parse(localStorage.getItem(SIGNED_IN_USER)));

watch(signedInUser, (newVal) => {
  if (newVal) {
    localStorage.setItem(SIGNED_IN_USER, JSON.stringify(newVal));
  } else {
    localStorage.removeItem(SIGNED_IN_USER);
  }
});

export default () => ({
  signedInUser,
});

<template>
  <login-form v-if="!signedInUser"></login-form>
  <div v-else id="#App">
    <button>Sign out</button>
  </div>
</template>

<script>
import useUser from '@/composition/useUser';
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  setup() {
    const { signedInUser } = useUser();

    return {
      signedInUser,
    };
  },
};
</script>

<style lang="scss">
</style>

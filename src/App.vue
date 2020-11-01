<template>
  <login-form v-if="!signedInUser"></login-form>
  <div v-else id="Main">
    <header>
      <button @click="signedInUser = null">Sign out</button>
    </header>
    <main></main>
    <footer></footer>
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
:root {
  --blue-light: #BEE3F8;
  --blue-darker: #3182CE;
}
* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  height: 100vh;
}
#Main {
  display: grid;
  grid-template-rows: max-content auto max-content;
  height: 100vh;

  header, footer {
    display: grid;
    width: 100vw;
    height: 5rem;
    padding: 1rem;
    background: var(--blue-darker);
  }
  header, button {
    place-self: center end;
  }
  main {
    display: grid;
    grid-template-columns: auto max-content;
  }
}
</style>

<template>
  <div class="home">
    <LoginPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from '../components/Auth/LoginPage.vue'

export default {
  name: 'Home',
  components: {
    LoginPage
  },
}
</script>

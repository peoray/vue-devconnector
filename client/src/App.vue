<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import setAuthToken from './auth';
import jwt_decode from 'jwt-decode';

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  beforeCreate() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.$store.commit('SET_USER', decoded);
      this.$store.commit('SET_AUTHENTICATED', true);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.$store.dispatch('logoutUser');
        this.$store.commit('SET_PROFILE', null);
        this.$router.push('/login');
      }
    } else {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
// @import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
// @import './assets/index.css';
// @import './assets/App.css';
div .invalid-feedback {
  display: block;
}
#app {
  // background: $color-red;
}
</style>

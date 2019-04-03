<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand">DevConnector</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span class="navbar-toggler-icon"/>
      </button>

      <div class="collapse navbar-collapse" id="mobile-nav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/profiles" tag="a" class="nav-link">Developers</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link to="/register" class="nav-link" tag="a">Sign Up</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link" tag="a">Login</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link" @click="logoutUser" href="#">
                <img
                  class="rounded-circle"
                  :src="user.avatar || '../../assets/img/avatar.svg'"
                  :alt="user.name"
                  title="You must have a Gravatar connected to your email to display an image"
                >
                Logout
              </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions(['logoutUser'])
  }
};
</script>

<style scoped>
img {
  width: 25px;
  margin-right: 5px;
}
</style>
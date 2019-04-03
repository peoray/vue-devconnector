<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Log In</h1>
          <p class="lead text-center">Sign in to your DevConnector account</p>
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                :class="{invalid: errors.email}"
                placeholder="Email Address"
                name="email"
                v-model="email"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.email">{{errors.email}}</div>

            <div class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                :class="{invalid: errors.password}"
                placeholder="Password"
                name="password"
                v-model="password"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.password">{{errors.password}}</div>

            <input type="submit" value="Submit" class="btn btn-info btn-block mt-4">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  beforeCreate() {
    if (localStorage.jwtToken) {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    ...mapState(['errors', 'isAuthenticated'])
  },
  methods: {
    loginUser() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('loginUser', user);
    }
  }
};
</script>

<style>
</style>

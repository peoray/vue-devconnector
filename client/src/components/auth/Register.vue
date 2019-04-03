<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Sign Up</h1>
          <p class="lead text-center">Create your DevConnector account</p>
          <form @submit.prevent="registerUser" novalidate>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                :class="{invalid: errors.name}"
                placeholder="Name"
                name="name"
                v-model="name"
              >
              <div class="invalid-feedback" v-if="errors.name">{{errors.name}}</div>
            </div>
            <div class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                :class="{invalid: errors.name}"
                placeholder="Email Address"
                v-model="email"
                name="email"
              >
              <div class="invalid-feedback" v-if="errors.email">{{errors.email}}</div>

              <small
                class="form-text text-muted"
              >This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                :class="{invalid: errors.name}"
                placeholder="Password"
                v-model="password"
                name="password"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.password">{{errors.password}}</div>

            <div class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                :class="{invalid: errors.name}"
                placeholder="Confirm Password"
                v-model="password2"
                name="password2"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.password2">{{errors.password2}}</div>

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
      name: '',
      email: '',
      password: '',
      password2: ''
    };
  },
  beforeCreate() {
    if (localStorage.jwtToken) {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    ...mapState(['errors'])
  },
  methods: {
    registerUser() {
      const newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
        password2: this.password2
      };
      this.$store.dispatch('registerUser', newUser);
    }
  }
};
</script>

<style>
</style>

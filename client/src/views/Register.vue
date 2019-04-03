<template>
  <div>
    <Register/>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/auth/Register.vue';
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    Register
  },
  beforeCreate() {
    if (this.isAuthenticated) {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    ...mapState(['errors', 'isAuthenticated'])
  }
};
</script>
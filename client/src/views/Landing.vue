<template>
  <div>
    <Landing/>
  </div>
</template>

<script>
// @ is an alias to /src

import Landing from '@/components/layout/Landing.vue';

export default {
  name: 'home',
  components: {
    Landing
  }
};
</script>
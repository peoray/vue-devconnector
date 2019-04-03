<template>
  <div>
    <CreateProfile/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateProfile from '@/components/CreateProfile.vue';

export default {
  name: 'home',
  components: {
    CreateProfile
  }
};
</script>
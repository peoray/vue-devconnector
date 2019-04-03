<template>
  <div>
    <EditProfile/>
  </div>
</template>

<script>
// @ is an alias to /src
import EditProfile from '@/components/EditProfile.vue';

export default {
  name: 'home',
  components: {
    EditProfile
  }
};
</script>
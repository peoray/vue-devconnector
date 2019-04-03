<template>
  <div class="bg-dark text-white mt-5 p-4 text-center">Copyright &copy; {{ date }} DevConnector</div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style>
</style>


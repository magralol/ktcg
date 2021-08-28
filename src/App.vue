<template>
  <Navbar />
  <router-view></router-view>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  export default {
    components: {
      Navbar
    },
    data(){
      return {}
    },
    mounted() {},
    methods: {}
  }
</script>

<style>

</style>

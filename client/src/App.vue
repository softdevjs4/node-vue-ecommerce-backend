<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import Loading from 'vue-loading-overlay'
// Use Vuetify
Vue.use(Vuetify, {
  theme: {
    primary: '#03A9F4'
  }
})

// Use preloader
Vue.use(Loading, {
  color: '#03A9F4'
})
export default {
  name: 'App'
}
</script>

<style>
/* Vuetify */
@import "vuetify/dist/vuetify.min.css";
@import "https://fonts.googleapis.com/css?family=Roboto:300|Material+Icons";
/* Preloader */
@import 'vue-loading-overlay/dist/vue-loading.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

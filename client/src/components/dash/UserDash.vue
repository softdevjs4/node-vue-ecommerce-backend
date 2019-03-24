<template>
  <div>
    <h2>My Dashboard</h2>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  created () {
    Vue.axios.get('/admin/me')
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data))
  }
}
</script>

<style>

</style>

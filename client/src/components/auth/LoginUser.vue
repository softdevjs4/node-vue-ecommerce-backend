<template>
  <div>
    <h2>Login</h2>
    <form>
      <label for="">Email</label>
      <input type="text" v-model="email">
      <small v-if="isError">{{errors.email}}</small>
      <label for="">Password</label>
      <input type="password" v-model="password">
      <small v-if="isError">{{errors.password}}</small>
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LoginUser',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      errors: 'auth/getErrors',
      isError: 'auth/isError'
    })
  },
  methods: {
    login (e) {
      e.preventDefault()
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('auth/login', payload)
    }
  }
}
</script>

<style>

</style>

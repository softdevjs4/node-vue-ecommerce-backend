<template>
  <div>
    <h2>Login</h2>
    <form>
      <label for="">Email</label>
      <input type="text" v-model="email">
      <label for="">Password</label>
      <input type="password" v-model="password">
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginUser',
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(e){
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

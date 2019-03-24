<template>
  <v-app style="margin-top:-60px">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    prepend-icon="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.email}}</div>
                      </div>
                    </div>
                  </div>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    :rules="passwordRules"
                    :type="'password'"
                    label="Password"
                    required
                  ></v-text-field>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.password}}</div>
                      </div>
                    </div>
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginUser',
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v.length >= 6) || 'Password must be at least 6 characters'
      ]
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

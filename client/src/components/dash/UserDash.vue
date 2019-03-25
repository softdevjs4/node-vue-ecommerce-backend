<template>
  <app-layout>
   <div slot="content">
      <h3 class="primary--text">Dashboard</h3>
      <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">Create contact</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field placeholder="Email"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn color="success" @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from '../layouts/AppLayout'
export default {
  components: {
    AppLayout
  },
  data: () => ({
    dialog: false
  })
}
</script>

<style>

</style>

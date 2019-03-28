<template>
  <div>
    <app-layout row>
      <div slot="content" row>
        <div xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Option Group</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="optionGroups" :search="search">
              <template v-slot:items="props">
                <td class="text-lg-left">{{ props.item.name }}</td>
                <td class="text-lg-left">{{ props.item.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="text-lg-left">
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn small icon color="primary" style="flot:left">
                        <v-icon small @click="editOptionGroup(props.item)">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm6>
                      <v-btn small icon color="red">
                        <v-icon
                          small
                          color="white"
                          @click="deleteOptionGroup($event, props.item._id)"
                        >delete</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </td>
              </template>
              <v-alert
                v-slot:no-results
                :value="true"
                color="error"
                icon="warning"
              >Your search for "{{ search }}" found no results.</v-alert>
            </v-data-table>
          </v-card>
        </div>

        <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
          <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Create Option Group</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="optionGroupName"
                    :rules="nameRules"
                    label="Option Group Name"
                    required
                  ></v-text-field>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.name}}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
              <v-btn color="success" @click="createOptionGroup">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Update Option Group</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="updateOptionGroupName"
                    :rules="nameRules"
                    label="Oprion Group Name"
                    required
                  >{{updateOptionGroupName}}</v-text-field>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.name}}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="editDialog = false">Cancel</v-btn>
              <v-btn color="info" @click="updateOptionGroup">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </app-layout>
  </div>
</template>

<script>
import AppLayout from '../../layouts/AppLayout'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductOptionGroupList',
  components: {
    AppLayout
  },
  data: () => ({
    loader: '',
    dialog: false,
    editDialog: false,
    optionGroupName: '',
    currentlySelectedCatId: '',
    updateOptionGroupName: '',
    nameRules: [v => !!v || 'Option Group name is required'],
    search: '',
    headers: [
      {
        text: 'Option Group Name',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'Created At', value: 'created_at' },
      { text: 'Action', value: 'action' }
    ]
  }),
  created () {
    // Show preloader
    if (this.isLoading) {
      this.loader = this.$loading.show()
    }
    this.$store.dispatch('productOptionGroup/getOptionGroups')
    // Hide preloader
    if (!this.isLoading) if (this.loader) this.loader.hide()
  },
  updated () {
    // Show loader
    if (this.isLoading) {
      this.loader = this.$loading.show()
    } else {
      if (this.loader) this.loader.hide()
    }
  },
  computed: {
    ...mapGetters({
      errors: 'error/getErrors',
      isError: 'error/isError',
      isLoading: 'loader/isLoading',
      optionGroups: 'productOptionGroup/getOptionGroups'
    })
  },
  methods: {
    createOptionGroup (e) {
      e.preventDefault()
      let payload = {
        name: this.optionGroupName
      }
      this.$store.dispatch('productOptionGroup/createOptionGroup', payload)
      if (this.$store.getters.isError) {
        this.dialog = true
      } else {
        this.optionGroupName = ''
        this.dialog = false
      }
    },
    editOptionGroup (optionGroup) {
      this.editDialog = true
      this.currentlySelectedCatId = optionGroup._id
      this.updateOptionGroupName = optionGroup.name
    },
    updateOptionGroup (e) {
      e.preventDefault()
      let payload = {
        _id: this.currentlySelectedCatId,
        data: {
          name: this.updateOptionGroupName
        }
      }
      this.$store.dispatch('productOptionGroup/updateOptionGroup', payload)
      if (this.$store.getters.isError) {
        this.editDialog = true
      } else {
        this.editDialog = false
      }
    },
    deleteOptionGroup (e, id) {
      e.preventDefault()
      let payload = {
        _id: id
      }
      this.$store.dispatch('productOptionGroup/deleteOptionGroup', payload)
    }
  }
}
</script>

<style>
</style>

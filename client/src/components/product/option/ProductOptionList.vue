<template>
  <div>
    <app-layout row>
      <div slot="content" row>
        <div xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Options</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="options" :search="search">
              <template v-slot:items="props">
                <td class="text-lg-left">{{ props.item.optionGroup.name | ucWords }}</td>
                <td class="text-lg-left">{{ props.item.name }}</td>
                <td class="text-lg-left">{{ props.item.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="text-lg-left">
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn small icon color="primary" style="flot:left">
                        <v-icon small @click="editOption(props.item)">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm6>
                      <v-btn small icon color="red">
                        <v-icon
                          small
                          color="white"
                          @click="deleteOption($event, props.item._id)"
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

        <v-btn fab bottom right color="pink" dark fixed @click="addBtnClick">
          <v-icon>add</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Create Option</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    v-model="select"
                    label="Option Group"
                    :items="optionGroups"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="setCurrentlySelectedOption"
                  ></v-select>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.name}}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="optionName"
                    :rules="nameRules"
                    label="Option Name"
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
              <v-btn color="success" @click="createOption">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Update Option</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                 <v-flex xs12>
                  <v-select
                    v-model="select"
                    label="Option Group"
                    :items="optionGroups"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="setCurrentlySelectedOption"
                  ></v-select>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.name}}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="updateOptionName"
                    :rules="nameRules"
                    label="Option Name"
                    required
                  >{{updateOptionName}}</v-text-field>
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
              <v-btn color="info" @click="updateOption">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </app-layout>
  </div>
</template>

<script>
import AppLayout from '../../layouts/AppLayout'
import ucWords from '../../../helpers/ucWords'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductOptionList',
  components: {
    AppLayout
  },
  data: () => ({
    loader: '',
    dialog: false,
    editDialog: false,
    optionName: '',
    currentlySelectedOptionGroupId: '',
    currentlySelectedOptionId: '',
    select: {text: 'Choose', value: ''},
    updateOptionName: '',
    nameRules: [v => !!v || 'Option name is required'],
    search: '',
    headers: [
      {
        text: 'Option Group',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Option', value: 'name' },
      { text: 'Created At', value: 'created_at' },
      { text: 'Action', value: 'action' }
    ]
  }),
  created () {
    // Show preloader
    if (this.isLoading) {
      this.loader = this.$loading.show()
    }
    this.$store.dispatch('productOption/getOptions')
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
      optionGroups: 'productOptionGroup/getOptionGroups',
      options: 'productOption/getOptions'
    })
  },
  methods: {
    addBtnClick () {
      this.dialog = !this.dialog
      // Get option for select
      this.$store.dispatch('productOptionGroup/getOptionGroups')
    },
    setCurrentlySelectedOption (option) {
      this.currentlySelectedOptionGroupId = option._id
    },
    createOption (e) {
      e.preventDefault()

      let payload = {
        optionGroup: this.currentlySelectedOptionGroupId,
        name: this.optionName
      }
      this.$store.dispatch('productOption/createOption', payload)
      if (this.$store.getters.isError) {
        this.dialog = true
      } else {
        this.optionName = ''
        this.dialog = false
      }
    },
    editOption (option) {
      this.editDialog = true
      // Set value for update
      this.currentlySelectedOptionId = option._id
      this.updateOptionName = option.name
      // Get option for select
      this.$store.dispatch('productOptionGroup/getOptionGroups')
      // Select current option
      this.select = option.optionGroup
      if (!this.currentlySelectedOptionGroupId) {
        this.currentlySelectedOptionGroupId = option.optionGroup._id
      }
    },
    updateOption (e) {
      e.preventDefault()
      let payload = {
        _id: this.currentlySelectedOptionId,
        data: {
          optionGroup: this.currentlySelectedOptionGroupId,
          name: this.updateOptionName
        }
      }
      this.$store.dispatch('productOption/updateOption', payload)
      if (this.$store.getters.isError) {
        this.editDialog = true
      } else {
        this.editDialog = false
      }
    },
    deleteOption (e, id) {
      e.preventDefault()
      let payload = {
        _id: id
      }
      this.$store.dispatch('productOption/deleteOption', payload)
    }
  },
  filters: {
    ucWords: function (value) {
      return ucWords(value)
    }
  }
}
</script>

<style>
</style>

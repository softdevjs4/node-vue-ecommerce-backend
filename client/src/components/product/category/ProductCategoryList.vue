<template>
  <div>
    <app-layout row>
      <div slot="content" row>
        <div xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Category</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="categories" :search="search">
              <template v-slot:items="props">
                <td class="text-lg-left">{{ props.item.name }}</td>
                <td class="text-lg-left">{{ props.item.created_at }}</td>
                <td class="text-lg-left">
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn small icon color="primary" style="flot:left">
                        <v-icon small @click="editCategory(props.item)">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm6>
                      <v-btn small icon color="red">
                        <v-icon
                          small
                          color="white"
                          @click="deleteCategory($event, props.item._id)"
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
            <v-card-title class="grey lighten-4 py-4 title">Create Category</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="categoryName"
                    :rules="nameRules"
                    label="Category Name"
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
              <v-btn color="success" @click="createCategory">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Update Category</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="updateCategoryName"
                    :rules="nameRules"
                    label="Category Name"
                    required
                  >{{updateCategoryName}}</v-text-field>
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
              <v-btn color="info" @click="updateCategory">Update</v-btn>
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
  name: 'ProductCategoryList',
  components: {
    AppLayout
  },
  data: () => ({
    loader: '',
    dialog: false,
    editDialog: false,
    categoryName: '',
    currentlySelectedCatId: '',
    updateCategoryName: '',
    nameRules: [v => !!v || 'Category name is required'],
    search: '',
    headers: [
      {
        text: 'Category Name',
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
    this.$store.dispatch('productCategory/getCategories')
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
      categories: 'productCategory/getCategories'
    })
  },
  methods: {
    createCategory (e) {
      e.preventDefault()
      let payload = {
        name: this.categoryName
      }
      this.$store.dispatch('productCategory/createCategory', payload)
      if (this.$store.getters.isError) {
        this.dialog = true
      } else {
        this.categoryName = ''
        this.dialog = false
      }
    },
    editCategory (category) {
      this.editDialog = true
      this.currentlySelectedCatId = category._id
      this.updateCategoryName = category.name
    },
    updateCategory (e) {
      e.preventDefault()
      let payload = {
        _id: this.currentlySelectedCatId,
        data: {
          name: this.updateCategoryName
        }
      }
      this.$store.dispatch('productCategory/updateCategory', payload)
      if (this.$store.getters.isError) {
        this.editDialog = true
      } else {
        this.editDialog = false
      }
    },
    deleteCategory (e, id) {
      e.preventDefault()
      let payload = {
        _id: id
      }
      this.$store.dispatch('productCategory/deleteCategory', payload)
    }
  }
}
</script>

<style>
</style>

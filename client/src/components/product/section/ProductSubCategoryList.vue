<template>
  <div>
    <app-layout row>
      <div slot="content" row>
        <div xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Sub Category</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="subCategories" :search="search">
              <template v-slot:items="props">
                <td class="text-lg-left">{{ props.item.category.name | ucWords }}</td>
                <td class="text-lg-left">{{ props.item.name | ucWords}}</td>
                <td class="text-lg-left">{{ props.item.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="text-lg-left">
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn small icon color="primary" style="flot:left">
                        <v-icon small @click="editSubCategory(props.item)">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm6>
                      <v-btn small icon color="red">
                        <v-icon
                          small
                          color="white"
                          @click="deleteSubCategory($event, props.item._id)"
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
            <v-card-title class="grey lighten-4 py-4 title">Create Sub Category</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    v-model="select"
                    label="Category"
                    :items="categories"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="setCurrentlySelectedCategory"
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
                    v-model="subCategoryName"
                    :rules="nameRules"
                    label="Sub Category Name"
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
              <v-btn color="success" @click="createSubCategory">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Update Sub Category</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                 <v-flex xs12>
                  <v-select
                    v-model="select"
                    label="Category"
                    :items="categories"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="setCurrentlySelectedCategory"
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
                    v-model="updateSubCategoryName"
                    :rules="nameRules"
                    label="Sub Category Name"
                    required
                  >{{updateSubCategoryName}}</v-text-field>
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
              <v-btn color="info" @click="updateSubCategory">Update</v-btn>
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
  name: 'ProductSubCategoryList',
  components: {
    AppLayout
  },
  data: () => ({
    loader: '',
    dialog: false,
    editDialog: false,
    subCategoryName: '',
    currentlySelectedCatId: '',
    currentlySelectedSubCatId: '',
    select: {text: 'Choose', value: ''},
    updateSubCategoryName: '',
    nameRules: [v => !!v || 'Sub category name is required'],
    search: '',
    headers: [
      {
        text: 'Category',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'Sub Category', value: 'name' },
      { text: 'Created At', value: 'created_at' },
      { text: 'Action', value: 'action' }
    ]
  }),
  created () {
    // Show preloader
    if (this.isLoading) {
      this.loader = this.$loading.show()
    }
    this.$store.dispatch('productSubCategory/getSubCategories')
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
      categories: 'productCategory/getCategories',
      subCategories: 'productSubCategory/getSubCategories'
    })
  },
  methods: {
    addBtnClick () {
      this.dialog = !this.dialog
      // Get category for select
      this.$store.dispatch('productCategory/getCategories')
    },
    setCurrentlySelectedCategory (cat) {
      this.currentlySelectedCatId = cat._id
    },
    createSubCategory (e) {
      e.preventDefault()

      let payload = {
        category: this.currentlySelectedCatId,
        name: this.subCategoryName
      }
      this.$store.dispatch('productSubCategory/createSubCategory', payload)
      if (this.$store.getters.isError) {
        this.dialog = true
      } else {
        this.subCategoryName = ''
        this.dialog = false
      }
    },
    editSubCategory (subCategory) {
      this.editDialog = true
      // Set value for update
      this.currentlySelectedSubCatId = subCategory._id
      this.updateSubCategoryName = subCategory.name
      // Get category for select
      this.$store.dispatch('productCategory/getCategories')
      // Select current category
      this.select = subCategory.category
      if (!this.currentlySelectedCatId) {
        this.currentlySelectedCatId = subCategory.category._id
      }
    },
    updateSubCategory (e) {
      e.preventDefault()
      let payload = {
        _id: this.currentlySelectedSubCatId,
        data: {
          category: this.currentlySelectedCatId,
          name: this.updateSubCategoryName
        }
      }
      this.$store.dispatch('productSubCategory/updateSubCategory', payload)
      if (this.$store.getters.isError) {
        this.editDialog = true
      } else {
        this.editDialog = false
      }
    },
    deleteSubCategory (e, id) {
      e.preventDefault()
      let payload = {
        _id: id
      }
      this.$store.dispatch('productSubCategory/deleteSubCategory', payload)
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

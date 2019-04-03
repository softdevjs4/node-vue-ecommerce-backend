<template>
  <div>
    <app-layout row>
      <div slot="content" row style="width: 100%">
        <div xs12 sm12 offset-sm3>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Manufacturers</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="manufacturers" :search="search">
              <template v-slot:items="props">
                <td v-if="props.item.image" class="text-lg-left">
                   <v-img style="cursor: pointer"
                    :src="props.item.image.url"
                    :lazy-src="props.item.image.url"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    @click="showImage(props.item.image.url)"
                  >
                    <template v-slot:placeholder>
                      <v-layout
                        fill-height
                        align-center
                        justify-center
                        ma-0
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </td>
                <td v-else>😢</td>
                <td class="text-lg-left">{{ props.item.name | ucWords}}</td>
                <td class="text-lg-left">{{ props.item.url }}</td>
                <td class="text-lg-left">{{ props.item.created_at | moment("dddd, MMMM Do YYYY") }}</td>
                <td class="text-lg-left">
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn small icon color="primary" style="flot:left">
                        <v-icon small @click="editManufacturer(props.item)">edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm6>
                      <v-btn small icon color="red">
                        <v-icon
                          small
                          color="white"
                          @click="deleteManufacturer($event, props.item._id)"
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
            <v-card-title class="grey lighten-4 py-4 title">Create Manufacturer</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="manufacturerName"
                    :rules="nameRules"
                    label="Manufacturer Name"
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
                <v-flex xs12>
                  <v-text-field
                    v-model="url"
                    label="Url"
                    required
                  >
                  </v-text-field>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.url}}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
              <v-btn color="success" @click="createManufacturer">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" width="800px">
          <v-card>
            <v-card-title class="grey lighten-4 py-4 title">Update Manufacturer</v-card-title>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="updateManufacturerName"
                    :rules="nameRules"
                    label="Manufacturer Name"
                    required
                  >{{updateManufacturerName}}</v-text-field>
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
                    v-model="updateUrl"
                    label="Url"
                    required
                  >
                  {{updateUrl}}
                  </v-text-field>
                  <div v-if="isError" class="v-text-field__details">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message orange--text">{{ errors.url}}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="editDialog = false">Cancel</v-btn>
              <v-btn color="info" @click="updateManufacturer">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

          <!-- Photo show dialog -->
         <v-dialog v-model="showImageDialog" width="500px" height="500px">
          <v-card>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-img
                    :src="showImageUrl"
                    :lazy-src="showImageUrl"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-layout
                        fill-height
                        align-center
                        justify-center
                        ma-0
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="showImageDialog = false">Ok</v-btn>
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
  name: 'ManufacturerList',
  components: {
    AppLayout
  },
  data: () => ({
    loader: '',
    dialog: false,
    editDialog: false,
    showImageDialog: false,
    showImageUrl: '',
    manufacturerName: '',
    url: '',
    currentlySelectedMfrId: '',
    imageName: '',
    imageUrl: '',
    imageFile: '',
    updateManufacturerName: '',
    updateUrl: '',
    nameRules: [v => !!v || 'Manufacturer name is required'],
    search: '',
    headers: [
      {
        text: 'Logo',
        align: 'left',
        sortable: false,
        value: 'logo'
      },
      { text: 'Manufacturer Name', value: 'name' },
      { text: 'Url', value: 'url' },
      { text: 'Created At', value: 'created_at' },
      { text: 'Action', value: 'action' }
    ]
  }),
  created () {
    // Show preloader
    if (this.isLoading) {
      this.loader = this.$loading.show()
    }
    this.$store.dispatch('manufacturer/getManufacturers')
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
      manufacturers: 'manufacturer/getManufacturers'
    })
  },
  methods: {
    pickFile () {
      this.$refs.image.click()
    },

    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    createManufacturer (e) {
      e.preventDefault()
      let payload = {
        name: this.manufacturerName,
        url: this.url,
        image: this.imageFile
      }
      this.$store.dispatch('manufacturer/createManufacturer', payload)
      if (this.$store.getters.isError) {
        this.dialog = true
      } else {
        this.manufacturerName = ''
        this.url = ''
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
        this.dialog = false
      }
    },
    editManufacturer (manufacturer) {
      this.editDialog = true
      this.currentlySelectedMfrId = manufacturer._id
      this.updateManufacturerName = manufacturer.name
      this.updateUrl = manufacturer.url
    },
    updateManufacturer (e) {
      e.preventDefault()
      let payload = {
        _id: this.currentlySelectedMfrId,
        data: {
          name: this.updateManufacturerName,
          url: this.updateUrl,
          image: this.imageFile
        }
      }
      this.$store.dispatch('manufacturer/updateManufacturer', payload)
      if (this.$store.getters.isError) {
        this.editDialog = true
      } else {
        this.editDialog = false
      }
    },
    deleteManufacturer (e, id) {
      e.preventDefault()
      let payload = {
        _id: id
      }
      this.$store.dispatch('manufacturer/deleteManufacturer', payload)
    },
    showImage (imageSrc) {
      this.showImageDialog = true
      this.showImageUrl = imageSrc
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

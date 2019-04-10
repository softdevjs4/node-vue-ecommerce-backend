<template>
  <div>
    <app-layout>
      <div slot="content" row style="width:100%">
        <loader></loader>
        <div xs12>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Add Product Image</h3>
            </v-card-title>
            <v-container fluid grid-list-xl>
              <v-layout wrap align-center>
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
                <v-flex xs12 sm12 d-flex>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12 sm4 d-flex>
                  <v-btn @click="submit" color="info">Submit</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </div>
        <div xs12>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Images</h3>
            </v-card-title>
            <v-container fluid grid-list-xl>
              <v-layout wrap align-center >
                 <v-data-table :headers="headers" :items="images" :search="search" style="width:100%">
                  <template v-slot:items="props">
                    <td v-if="props.item" class="text-lg-left">
                   <v-img
                    :src="props.item.url"
                    :lazy-src="props.item.url"
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
                </td>
                    <td class="text-lg-left">
                      <v-layout row wrap>
                        <v-flex sm12>
                          <v-btn small icon color="red">
                            <v-icon
                              small
                              color="white"
                              @click="deleteImage($event, props.item.id)"
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
              </v-layout>
            </v-container>
          </v-card>
        </div>
      </div>
    </app-layout>
  </div>
</template>

<script>
import AppLayout from '../../layouts/AppLayout'
import Loader from '../../utils/Loader'
import { mapGetters } from 'vuex'
export default {
  components: {
    AppLayout,
    Loader
  },
  props: ['productId'],
  data: () => ({
    imageName: '',
    imageUrl: '',
    imageFile: '',
    search: '',
    headers: [
      {
        text: 'Image',
        align: 'left',
        sortable: false,
        value: 'image'
      },
      { text: 'Action', value: 'action' }
    ]
  }),
  created () {
    // Dispatch action to get all images
    this.$store.dispatch('product/getImages', this.productId)
  },
  computed: {
    ...mapGetters({
      isError: 'error/isError',
      errors: 'error/getErrors',
      images: 'product/getImages'
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
    // Submit data
    submit () {
      // Dispatch action to add product image
      const payload = {
        productId: this.productId,
        image: this.imageFile
      }
      // Dispatch action to add product image
      this.$store.dispatch('product/addProductImage', payload)
    },
    deleteImage (e, imageId) {
      e.preventDefault()
      const payload = {
        productId: this.productId,
        imageId: imageId
      }
      // Dispatch image delete action
      this.$store.dispatch('product/deleteImage', payload)
    }
  }
}
</script>

<style>
</style>

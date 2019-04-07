<template>
  <div>
    <app-layout>
      <div slot="content" row style="width:100%">
        <loader></loader>
        <div xs12>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Create Product</h3>
            </v-card-title>
            <v-container fluid grid-list-xl>
              <v-layout wrap align-center>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    label="Category"
                    v-model="selectCategory"
                    :items="categories"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="selectedCategory"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    label="Sub Category"
                    v-model="selectSubCategory"
                    :items="subCategories"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="selectedSubCategory"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    label="Manufacturer"
                    v-model="selectManufacturer"
                    :items="manufacturers"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="selectedManufacturer"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-text-field label="Product Model" v-model="productModel"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 d-flex>
                  <v-text-field label="Product Name" v-model="name" :counter="400" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 d-flex>
                  <v-text-field label="Sort Desc" v-model="sortDesc" :counter="200" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 d-flex>
                  <v-textarea label="Long Desc" v-model="longDesc" required></v-textarea>
                </v-flex>

                <!-- Flash sale data -->
                <v-flex xs12 sm12 d-flex>
                  <v-checkbox v-model="isFlash" :label="'Is Flash Sale'"></v-checkbox>
                </v-flex>

                <div v-if="isFlash" sm12 style="width:100%">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Flash Price" v-model="flashPrice"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-menu
                          ref="flashStartMenu"
                          v-model="flashStartMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="flashStartDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="flashStartDate"
                              label="Flash Start"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="flashStartDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="flashStartMenu = false">Cancel</v-btn>
                            <v-btn
                              flat
                              color="primary"
                              @click="$refs.flashStartMenu.save(flashStartDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-menu
                          ref="flashEndMenu"
                          v-model="flashEndMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="flashEndDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="flashEndDate"
                              label="Flash End"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="flashEndDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="flashEndMenu = false">Cancel</v-btn>
                            <v-btn
                              flat
                              color="primary"
                              @click="$refs.flashEndMenu.save(flashEndDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-checkbox v-model="flashStatus" :label="'Active'"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
                <!-- Flash sale end -->

                <!-- Special sale end -->
                <v-flex xs12 sm12 d-flex>
                  <v-checkbox v-model="isSpecial" :label="'Is Special Sale'"></v-checkbox>
                </v-flex>

                <div v-if="isSpecial" sm12 style="width:100%">
                  <v-container>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field label="Special Price" v-model="specialPrice"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-menu
                          ref="specialExpireMenu"
                          v-model="specialExpireMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="specialExpireDate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="specialExpireDate"
                              label="Special Expire"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="specialExpireDate" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="specialExpireMenu = false">Cancel</v-btn>
                            <v-btn
                              flat
                              color="primary"
                              @click="$refs.specialExpireMenu.save(specialExpireDate)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                        <v-checkbox v-model="specialStatus" :label="'Active'"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
                <!-- Special sale end -->

                <v-flex xs12 sm6 d-flex>
                  <v-text-field label="Product Weight(KG)" v-model="weight"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-text-field label="Product Price($)" v-model="price"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-text-field label="Product Stock" v-model="stock"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-checkbox v-model="inStock" :label="'In Stock'"></v-checkbox>
                </v-flex>
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <img :src="thumbUrl" height="150" v-if="thumbUrl">
                  <v-text-field
                    label="Select Product Thumb"
                    @click="pickFile"
                    v-model="thumbName"
                    prepend-icon="photo"
                  ></v-text-field>
                  <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-checkbox v-model="isFeature" :label="'Is Feature Product'"></v-checkbox>
                </v-flex>
                <v-flex xs12 sm6 d-flex>
                  <v-checkbox v-model="status" :label="'Product Active'"></v-checkbox>
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
  data: () => ({
    selectCategory: {},
    selectSubCategory: {},
    selectManufacturer: {},
    // from data
    category: '',
    subCategory: '',
    manufacturer: '',
    productModel: '',
    name: '',
    sortDesc: '',
    longDesc: '',
    // Flash sale data
    isFlash: false,
    flashPrice: '',
    flashStartDate: new Date().toISOString().substr(0, 10),
    flashStartMenu: false,
    flashEndDate: new Date().toISOString().substr(0, 10),
    flashEndMenu: false,
    modal: false,
    flashStatus: false,
    // Special sale data
    isSpecial: false,
    specialPrice: '',
    specialExpireDate: new Date().toISOString().substr(0, 10),
    specialExpireMenu: false,
    specialStatus: false,

    // Other data
    weight: '',
    price: '',
    stock: 0,
    inStock: true,
    isFeature: false,
    status: true,

    // Thumb
    thumbName: '',
    thumbUrl: '',
    thumbFile: ''
  }),
  created () {
    // Dispatch action to get all category
    this.$store.dispatch('productCategory/getCategories')
    // Dispatch action to get all manufacturers
    this.$store.dispatch('manufacturer/getManufacturers')
  },
  computed: {
    ...mapGetters({
      categories: 'productCategory/getCategories',
      subCategories: 'productCategory/getSubCategoriesByCategory',
      manufacturers: 'manufacturer/getManufacturers'
    })
  },
  methods: {
    selectedCategory (category) {
      // Dispatch action to get sub category by category id
      this.$store.dispatch(
        'productCategory/getSubCategoriesByCategory',
        category
      )
      // Store category id into data for request
      this.category = category._id
    },
    selectedSubCategory (subCategory) {
      // Store sub category id into data for request
      this.subCategory = subCategory._id
    },
    selectedManufacturer (manufacturer) {
      // Store manufacturer id into data for request
      this.manufacturer = manufacturer._id
    },
    // Handle thumb select
    pickFile () {
      this.$refs.image.click()
    },
    // Handle thumb upload
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.thumbName = files[0].name
        if (this.thumbName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.thumbUrl = fr.result
          this.thumbFile = files[0]
        })
      } else {
        this.thumbName = ''
        this.thumbFile = ''
        this.thumbUrl = ''
      }
    },
    // Submit data
    submit () {
      const payload = {
        category: this.category,
        subCategory: this.subCategory,
        manufacturer: this.manufacturer,
        model: this.productModel,
        name: this.name,
        sortDesc: this.sortDesc,
        longDesc: this.longDesc,
        // Flash sale data
        flashSale: {
          flashPrice: this.flashPrice,
          flashStartDate: this.flashStartDate,
          flashEndDate: this.flashEndDate,
          flashStatus: this.flashStatus
        }
        // Special sale data
        specialSale: {
          specialPrice: this.specialPrice,
          specialExpireDate: this.specialExpireDate,
          specialStatus: this.specialStatus
        }
        // Other data
        weight: this.weight,
        price: this.price,
        stock: this.stock,
        inStock: this.inStock,
        isFeature: this.isFeature,
        status: this.status,
        // Thumb
        thumb: this.thumbFile
      }

      console.log(payload)
    }
  }
}
</script>

<style>
</style>

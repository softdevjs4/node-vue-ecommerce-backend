<template>
  <div>
    <app-layout row>
      <div slot="content" row style="width: 100%">
        <loader></loader>
        <div xs12 sm12 offset-sm3>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Products</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :rows-per-page-items="rowsPerPageItems"
              :pagination.sync="pagination"
              :headers="headers"
              :items="products"
              :search="search"
            >
              <template v-slot:items="props">
                <td v-if="props.item.thumb" class="text-lg-left">
                  <v-img
                    style="cursor: pointer"
                    :src="props.item.thumb.url"
                    :lazy-src="props.item.thumb.url"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    @click="showThumb(props.item.thumb.url)"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </td>
                <td v-else>😢</td>
                <td class="text-lg-left">{{ props.item.name | ucWords }}</td>
                <td class="text-lg-left">
                  <div class="info-wrap">
                    <p>
                      <span class="info-label info--text">SKU:</span>
                      {{ props.item.sku }}
                    </p>
                    <p>
                      <span class="info-label info--text">Category:</span>
                      {{ props.item.category.name }}
                    </p>
                    <p>
                      <span class="info-label info--text">Sub Category:</span>
                      {{ props.item.subCategory.name }}
                    </p>
                    <p>
                      <span class="info-label info--text">Price($):</span>
                      {{ props.item.price }}
                    </p>
                  </div>
                </td>
                <td class="text-lg-left">
                  <div class="info-wrap">
                    <p>
                      <span class="info-label info--text">Created:</span>
                      {{ props.item.created_at | moment("dddd, MMMM Do YYYY") }}
                    </p>
                    <div v-if="props.item.isFlashSale" class="falsh-sale">
                      <p class="flash-header primary ">Flash sale</p>
                      <div class="info-wrap">
                    <p>
                      <span class="info-label info--text">Flash Price($):</span>
                      {{ props.item.flashSale.flashPrice }}
                    </p>
                    <p>
                      <span class="info-label info--text">Start:</span>
                      {{ props.item.flashSale.flashStart }}
                    </p>
                    <p>
                      <span class="info-label info--text">End:</span>
                      {{ props.item.flashSale.flashEnd }}
                    </p>

                  </div>
                    </div>

                    <div v-if="props.item.isSpecialSale" class="special-sale">
                      <p class="special-header success ">Special sale</p>
                      <div class="info-wrap">
                    <p>
                      <span class="info-label info--text">Flash Price($):</span>
                      {{ props.item.specialSale.specialPrice }}
                    </p>
                    <p>
                      <span class="info-label info--text">Start:</span>
                      {{ props.item.specialSale.specailExpire }}
                    </p>
                  </div>
                    </div>
                  </div>
                </td>
                <td class="text-lg-left">
                  <v-layout row wrap>
                    <v-flex sm6>
                      <v-btn small icon color="primary" style="flot:left">
                        <v-icon small>edit</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm6>
                      <v-btn small icon color="red">
                        <v-icon small color="white">delete</v-icon>
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

        <v-btn fab bottom right color="pink" dark fixed @click="addProduct">
          <v-icon>add</v-icon>
        </v-btn>

        <!-- Photo show dialog -->
        <v-dialog v-model="showThumbDialog" width="500px" height="500px">
          <v-card>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-img
                    :src="showThumbUrl"
                    :lazy-src="showThumbUrl"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="showThumbDialog = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </app-layout>
  </div>
</template>

<script>
import AppLayout from '../../layouts/AppLayout'
import Loader from '../../utils/Loader'
import ucWords from '../../../helpers/ucWords'
import { mapGetters } from 'vuex'
export default {
  name: 'ProductList',
  components: {
    AppLayout,
    Loader
  },
  data: () => ({
    showThumbDialog: false,
    showThumbUrl: '',
    search: '',
    headers: [
      {
        text: 'Thumb',
        align: 'left',
        sortable: false,
        value: 'logo'
      },
      { text: 'Product Name', value: 'name' },
      { text: 'Product Info', value: 'info' },
      { text: 'Others', value: 'others' },
      { text: 'Action', value: 'action' }
    ],
    rowsPerPageItems: [
      10,
      20,
      30,
      40,
      { text: '$vuetify.dataIterator.rowsPerPageAll', value: -1 }
    ],
    pagination: {
      rowsPerPage: 20
    }
  }),
  created () {
    // Dispatch action to get product list
    this.$store.dispatch('product/getProducts')
  },
  computed: {
    ...mapGetters({
      isLoading: 'loader/isLoading',
      products: 'product/getProducts'
    })
  },
  methods: {
    addProduct () {
      this.$router.push({ name: 'productCreate' })
    },
    showThumb (imageSrc) {
      this.showThumbDialog = true
      this.showThumbUrl = imageSrc
    }
  },
  filters: {
    ucWords: function (value) {
      return ucWords(value)
    }
  }
}
</script>

<style scoped>
.info-wrap {
  padding: 5px;
}
p {
  margin-bottom: 0px;
}
.info-label {
  font-weight: bold;
}
.flash-header{
  color: white;
  text-align: center;
}
.special-header{
  color: white;
  text-align: center;
}
</style>

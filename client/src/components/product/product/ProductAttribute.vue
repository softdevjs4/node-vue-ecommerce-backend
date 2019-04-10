<template>
  <div>
    <app-layout>
      <div slot="content" row style="width:100%">
        <loader></loader>
        <div xs12>
          <v-card>
            <v-card-title>
              <h3 class="primary--text text-lg-left">Add Product Attribute</h3>
            </v-card-title>
            <v-container fluid grid-list-xl>
              <v-layout wrap align-center>
                <v-flex xs12 sm6>
                  <v-select
                    label="Option Group"
                    v-model="selectOptionGroup"
                    :items="productOptionGroups"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="selectedOptionGroup"
                  ></v-select>
                  <div v-if="isError" class="v-text-field__details text-sm-left">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message red--text">{{ errors.name }}</div>
                      </div>
                    </div>
                  </div>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-select
                    label="Option"
                    v-model="selectSubCategory"
                    :items="options"
                    item-value="_id"
                    item-text="name"
                    return-object
                    @change="selectedOption"
                  ></v-select>
                  <div v-if="isError" class="v-text-field__details text-sm-left">
                    <div class="v-messages theme--light error--text">
                      <div class="v-messages__wrapper">
                        <div class="v-messages__message red--text">{{ errors.name }}</div>
                      </div>
                    </div>
                  </div>
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
              <h3 class="primary--text text-lg-left">Attributes</h3>
            </v-card-title>
            <v-container fluid grid-list-xl>
              <v-layout wrap align-center >
                 <v-data-table :headers="headers" :items="attributes" :search="search" style="width:100%">
                  <template v-slot:items="props">
                    <td class="text-lg-left">{{ props.item.optionGroupName | ucWords}}</td>
                    <td class="text-lg-left">
                      <span v-for="option in props.item.options" :key="option._id">{{option.name}}, </span>
                    </td>
                    <td class="text-lg-left">
                      <v-layout row wrap>
                        <v-flex sm12>
                          <v-btn small icon color="red">
                            <v-icon
                              small
                              color="white"
                              @click="deleteAttribute($event, props.item.optionGroupId)"
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
import ucWords from '../../../helpers/ucWords'
import { mapGetters } from 'vuex'
export default {
  components: {
    AppLayout,
    Loader
  },
  props: ['productId'],
  data: () => ({
    selectOptionGroup: {},
    selectSubCategory: {},
    optionGroup: '',
    option: '',
    search: '',
    headers: [
      {
        text: 'Option Group',
        align: 'left',
        sortable: true,
        value: 'group'
      },
      { text: 'Options', value: 'options' },
      { text: 'Action', value: 'action' }
    ]
  }),
  created () {
    // Dispatch action to get all option group
    this.$store.dispatch('productOptionGroup/getOptionGroups')
    // Dispatch action to get all attributes
    this.$store.dispatch('product/getAttributes', this.productId)
  },
  computed: {
    ...mapGetters({
      isError: 'error/isError',
      errors: 'error/getErrors',
      productOptionGroups: 'productOptionGroup/getOptionGroups',
      options: 'productOptionGroup/getOptionsByOptionGroup',
      attributes: 'product/getAttributes'
    })
  },
  methods: {
    selectedOptionGroup (optionGroup) {
      // Dispatch action to get option by option group id
      this.$store.dispatch(
        'productOptionGroup/getOptionsByOptionGroup',
        optionGroup
      )
      // Store option group id into data for request
      this.optionGroup = optionGroup
    },
    selectedOption (option) {
      // Store sub optionGroup id into data for request
      this.option = option
    },
    // Submit data
    submit () {
      // Dispatch action to add product attribute
      const payload = {
        productId: this.productId,
        optionGroup: this.optionGroup,
        option: this.option
      }
      // Dispatch action to add product attribute
      this.$store.dispatch('product/addProductAttribute', payload)
    },
    deleteAttribute (e, attId) {
      e.preventDefault()
      const payload = {
        productId: this.productId,
        attId: attId
      }
      // Dispatch attribute delete action
      this.$store.dispatch('product/deleteAttribute', payload)
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

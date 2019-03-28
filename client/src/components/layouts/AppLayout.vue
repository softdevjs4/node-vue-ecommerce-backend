<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" fixed app>
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="menuAction(child.title)">
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title >{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="menuAction(item.title)">
            <v-list-tile-action>
              <v-icon :class="{logout: item.isLogout}">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title :class="{logout: item.isLogout}">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Dashboard</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <v-content style="padding-top:0">
      <v-container fluid>
        <v-layout>
          <slot name="content"></slot>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import router from '../../router'

export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'home', text: 'Dashboard', title: 'userDashboard' },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Product Section',
        model: false,
        children: [
          { icon: 'view_list', text: 'Product Category', title: 'productCategory' },
          { icon: 'view_list', text: 'Product Sub Category', title: 'productSubCategory' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Product Option',
        model: false,
        children: [
          { icon: 'view_list', text: 'Product Option Group', title: 'productOptionGroup' },
          { icon: 'view_list', text: 'Product Option', title: 'productOption' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Send feedback' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'logout', text: 'Logout', title: 'logout', isLogout: true }
    ]
  }),
  props: {
    source: String
  },
  methods: {
    menuAction (title) {
      if (title === 'userDashboard') {
        router.push({name: 'userDashboard'})
      } else if (title === 'productCategory') {
        router.push({name: 'productCategoryList'})
      } else if (title === 'productSubCategory') {
        router.push({name: 'productSubCategoryList'})
      } else if (title === 'productOptionGroup') {
        router.push({name: 'productOptionGroupList'})
      } else if (title === 'logout') {
        this.$store.dispatch('auth/logout')
      }
    }
  }
}
</script>

<style>
.logout{
  color:red !important
}
</style>

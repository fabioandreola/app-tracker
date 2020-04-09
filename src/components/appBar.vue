<template>
  <div>
    <!-- <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template>
          <v-list-item link v-on:click="logout()">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Logout
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
     <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Tracker</span>
      </v-toolbar-title>
      <v-spacer />

      <v-btn icon large>
        <v-avatar size="32px" menu>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify" />
        </v-avatar>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // drawer: null,
      }
    },
    methods: {
      
    }
  }
</script>
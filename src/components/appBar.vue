<template>
  <div>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Tracker</span>
      </v-toolbar-title>

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

      }
    },
    methods: {
      
    }
  }
</script>
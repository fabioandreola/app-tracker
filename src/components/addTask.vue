<template>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">
          Create task
        </v-card-title>
        <v-container>
         
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer />
          <v-btn text color="primary" @click="closeDialog">Cancel</v-btn>
          <v-btn text @click="closeDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: Boolean
    },
    methods: {
        closeDialog: function(){
            this.$emit('closeDialog');
        }
    }
}
</script>
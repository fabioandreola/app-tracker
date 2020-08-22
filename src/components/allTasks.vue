<template>
    <div>
        <h3 class="grey--text text--darken-2 mb-1">{{header}}</h3>
        <v-divider></v-divider>
        <v-card flat v-for="item in items" :key="item.id" @click="showTaskDetails(item.id)">
            <v-layout row wrap :class="`pa-3 item ${item.status}`">
                <v-flex xs2>
                    <v-icon size="40" v-bind:color="item.icon.color">{{item.icon.name}}</v-icon>
                </v-flex>
                <v-flex xs8 @click="showTaskDetails(item.id)">
                    <h3>{{ item.title }}</h3>
                </v-flex>

                <v-flex xs12>
                    <v-progress-linear v-model="item.overallProgress" color="deep-purple accent-4"></v-progress-linear>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </v-card>
        <task-details v-if="viewTaskDetailsDialog" :dialog="viewTaskDetailsDialog" v-on:closeDialog="closeDetails" :task="currentTaskSelected" :uid="uid"></task-details>
    </div>
</template>

<script>
import taskDetails from './taskDetails.vue';
import { db } from '@/fb'

export default {
    components: {
        'task-details': taskDetails
    },
    props: {
        items: Array,
        header: String,
        uid: String
    },
    methods: {
        showTaskDetails(id) {
            this.currentTaskSelected = this.items.find(task => task.id == id);
            db.collection('users').doc(this.uid).collection('taskDetails').where("task_id", "==", this.currentTaskSelected.id).get()
                .then(snapshot => {
                    this.currentTaskSelected.taskDetails = snapshot.docs.map(doc => doc.data());
                    this.currentTaskSelected.taskDetails.sort((dt1, dt2) => {
                        if(new Date(dt1.day) > new Date(dt2.day)){
                            return 1;
                        } else {
                            return -1;
                        }
                    });
                    this.viewTaskDetailsDialog = true;
                });
        },
        closeDetails() {
            this.viewTaskDetailsDialog = false;
        }
    },
    data() {
        return {
            viewTaskDetailsDialog: false,
            currentTaskSelected: null
        }
    }
}
</script>

<style>
  .item {
    overflow: auto;
    max-width: 100%;
  }

  .item.complete {
    border-left: 4px solid #3cd1c2;
  }

  .item.ongoing {
    border-left: 4px solid #ffaa2c;
  }
</style>
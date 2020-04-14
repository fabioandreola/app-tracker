<template>
    <div>
        <h3 class="grey--text text--darken-2 mb-1">{{header}}</h3>
        <v-divider></v-divider>
        <v-card flat v-for="item in items" :key="item.currentDayGoalItem.id">
            <v-layout row wrap :class="`pa-3 item ${item.status}`">
                <v-flex xs2>
                    <v-icon size="40" v-bind:color="item.icon.color" @click="singleTaskDone(item.currentDayGoalItem.id)">{{item.icon.name}}</v-icon>
                </v-flex>
                <v-flex xs8>
                    <h3>{{ item.title }}</h3>
                </v-flex>
                <v-flex xs2 class="right">
                    <v-progress-circular :rotate="180" :size="50" :width="5" :value="item.dailyProgress" color="pink">
                        {{ item.dailyProgress }}
                    </v-progress-circular>
                </v-flex>
                <v-flex xs12>
                    <v-rating v-model="item.currentDayGoalItem.doneDayQty" v-bind:length="item.tasksPerDay" readonly>
                        <template v-slot:item="props">
                            <v-icon :color="props.isFilled ? 'green' : 'grey lighten-1'" large @click="props.click">
                                {{ props.isFilled ? 'mdi-check-underline-circle' : 'mdi-check-underline-circle-outline' }}
                            </v-icon>
                        </template>
                    </v-rating>
                    <v-progress-linear v-model="item.overallProgress" color="deep-purple accent-4"></v-progress-linear>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </v-card>
    </div>
</template>

<script>
export default {
    props: {
        items: Array,
        header: String
    },
    methods: {
        singleTaskDone: function(id){
            this.$emit('singleTaskDone', id)
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

  .item.overdue {
    border-left: 4px solid #f83e70;
  }

  .item.ongoing {
    border-left: 4px solid #ffaa2c;
  }
</style>
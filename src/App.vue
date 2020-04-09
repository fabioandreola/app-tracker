<template>
  <v-app id="inspire">
    <app-bar />
    <v-content>
      <v-container fluid>
        <task-list :items="items" :header="'Today'" v-on:singleTaskDone="addToGoal($event)"></task-list>
      </v-container>
    </v-content>
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <add-task :dialog="dialog" v-on:closeDialog="dialog = false"></add-task>
  </v-app>
</template>

<script>
  // Imports
  import appBar from './components/appBar.vue';
  import taskList from './components/taskList.vue';
  import addTask from './components/addTask.vue';

  export default {
    props: {
      source: String,
    },
    methods: {
      addToGoal: function (id) {
        let task = this.goals.find(item => item.id == id);
        console.log(task);
        if(task.currentDayGoalItem.doneDayQty < task.tasksPerDay){
          task.currentDayGoalItem.doneDayQty++;
          task.tasksCompleted++;
        }
      }
    },
    components: {
        'app-bar': appBar,
        'task-list': taskList,
        'add-task': addTask
    },
    computed: {
        items: function() {
          let items = [];
          this.goals.forEach(el => {
            let task = JSON.parse(JSON.stringify(el));
            task.overallProgress = Math.floor((el.tasksCompleted / el.totalTasks) * 100);
            task.dailyProgress = Math.floor((el.currentDayGoalItem.doneDayQty / el.tasksPerDay) * 100);
            if(el.currentDayGoalItem.doneDayQty == el.tasksPerDay){
              task.status = 'complete';
            }
            else{
              task.status = 'ongoing';
            }
           items.push(task)
          });

          console.log(items)
          return items;
        }

    },
    mounted: function(){

      this.goals = [{
        id: 1,
        title: 'Hair Product',
        startDate: "",
        endDate: "",
        template: "",
        tasksPerDay: 5,
        icon: {
            name: 'mdi-pill',
            color: 'green'
        },
        totalTasks: 5,
        tasksCompleted: 0,
        currentDayGoalItem: {
            day: "",
            doneDayQty: 0,
            times: ["","",""],
            notes: ""
        }  
      },
      {
        id: 2,
        title: 'Excercise',
        startDate: "",
        endDate: "",
        template: "",
        tasksPerDay: 5,
        icon: {
            name: 'mdi-weight-lifter',
            color: 'blue'
        },
        totalTasks: 5,
        tasksCompleted: 0,
        currentDayGoalItem: {
            day: "",
            doneDayQty: 0,
            times: ["","",""],
            notes: ""
        }  
      },
      {
        id: 3,
        title: 'Drink Water',
        startDate: "",
        endDate: "",
        template: "",
        tasksPerDay: 5,
        icon: {
            name: 'mdi-glass-pint-outline',
            color: 'orange'
        },
        totalTasks: 5,
        tasksCompleted: 0,
        currentDayGoalItem: {
            day: "",
            doneDayQty: 0,
            times: ["","",""],
            notes: ""
        }  
      }]
    },
    data: () => ({
      dialog: false,
      goals: []
    }),
  }
</script>
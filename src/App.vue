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
  import {db, getUser, functions} from '@/fb'

  export default {
    props: {
      source: String,
    },
    methods: {
      addToGoal: function (id) {
        let todayTask = this.todayTasks.find(item => item.id == id);
        let task = this.tasks.find(item => item.id == todayTask.task_id);
        const completeTask = functions.httpsCallable('completeTask');
        if(todayTask.doneDayQty < task.timesPerDay){

          todayTask.doneDayQty++;
          task.tasksCompleted++;

          completeTask({
              task_id: task.id,
              taskDetail_id: todayTask.id
          });
        }
      }
    },
    created: function() {
      let self = this;
      getUser().then(function(uid){
        console.log("User id: " + uid)
        self.uid = uid
      })
    },
    components: {
        'app-bar': appBar,
        'task-list': taskList,
        'add-task': addTask
    },
    computed: {
        items: function() {
          let items = [];
          this.todayTasks.forEach(el => {
            let task = this.tasks.find(t => t.id == el.task_id);
            if(task){
                  let item = {
                  id: task.id,
                  title: task.name,
                  startDate: task.startDate,
                  endDate: task.endDate,
                  template: task.template,
                  tasksPerDay: task.timesPerDay,
                  totalTasks: task.totalTasks,
                  icon: {
                    color: task.icon.color,
                    name: task.icon.name
                  },
                  currentDayGoalItem: {
                    day: el.day,
                    doneDayQty: el.doneDayQty,
                    id: el.id
                  },
                  overallProgress: Math.floor((task.tasksCompleted / task.totalTasks) * 100),
                  dailyProgress: Math.floor((el.doneDayQty / task.timesPerDay) * 100)
                }

                if(el.doneDayQty == task.timesPerDay){
                  item.status = 'complete';
                }
                else{
                  item.status = 'ongoing';
                }
                items.push(item)
            }
          });

          return items;
        }
    },
    watch: {
      uid: {
        handler(uid) {
          this.$bind('tasks', db.collection('users').doc(uid).collection('tasks'));
          this.$bind('todayTasks', db.collection('users').doc(uid).collection('taskDetails').where("day", "==", new Date().toISOString().slice(0, 10)));
        }
      }
    },
    data: () => ({
      dialog: false,
      tasks: [{name: "empty"}],
      todayTasks: [],
      uid: ""
    }),
  }
</script>
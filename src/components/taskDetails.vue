<template>
    <div>
        <v-overlay :value="inProgress">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-dialog v-model="dialog" width="800px" v-if="task">
            <v-card>
                <v-card-title class="blue">
                    <v-icon :class="task.icon.color + '--text' + ' taskDetailsIcon'">{{task.icon.name}}</v-icon>
                    {{task.title}}
                </v-card-title>
                <v-container>
                    <v-form ref="form" lazy-validation>
                        <v-row>
                            <v-col sm="6">
                                <v-text-field v-model="task.startDate" label="Start Date" prepend-icon="mdi-calendar"
                                    readonly></v-text-field>
                            </v-col>
                            <v-col sm="6">
                                <v-text-field v-model="task.endDate" label="End Date" prepend-icon="mdi-calendar"
                                    readonly></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row align="center">
                            <v-col sm="6">
                                <v-text-field v-model="task.template" label="Template" readonly></v-text-field>
                            </v-col>
                            <v-col sm="6">
                                <v-text-field v-model="task.tasksPerDay" label="Times per Day" readonly
                                    v-if="task.template == 'Daily'"></v-text-field>
                            </v-col>
                        </v-row>

                        <div>
                            <div v-for="item in task.taskDetails" :key="item.day">
                                <v-row>
                                    <v-col>
                                        <span>{{item.day}}</span>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col>
                                        <v-progress-circular :rotate="-90" :size="45" :width="5"
                                            :value="(item.doneDayQty/task.tasksPerDay) * 100" color="primary">
                                            {{Math.floor((item.doneDayQty/task.tasksPerDay) * 100)}}</v-progress-circular>
                                    </v-col>
                                </v-row>

                            </div>

                        </div>
                    </v-form>

                </v-container>
                <v-card-actions>
                    <v-btn text color="primary" @click="closeDialog">Cancel</v-btn>
                    <v-spacer />
                    <v-btn text @click="deleteTask(task.id)">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { functions } from '@/fb'

    export default {
        props: {
            task: Object,
            dialog: Boolean
        },
        methods: {
            deleteTask(id) {
                const deleteTask = functions.httpsCallable('deleteTask');
                this.inProgress = true;
                deleteTask({
                        task_id: id
                    }).then(() => {
                        this.inProgress = false;
                    })
                    .catch((error) => {
                        this.inProgress = false;
                        console.log(error);
                    });
                this.$emit('closeDialog');
            },
            closeDialog() {
                this.$emit('closeDialog');
            }
        },
        data() {
            return {
                inProgress: false
            }
        }
    }
</script>

<style>
    .taskDetailsIcon {
        margin-right: 10px;
    }
</style>
<template>
    <v-dialog v-model="dialog" width="800px">
        <v-card>
            <v-card-title class="blue">
                Create task
            </v-card-title>
            <v-container>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="taskName" label="Task Name" required></v-text-field>
                    <v-row>
                        <v-col sm="6">
                            <v-menu v-model="menuStartDate" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="startDate" label="Start Date" prepend-icon="mdi-calendar"
                                        readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="startDate" @input="menuStartDate = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col sm="6">
                            <v-menu v-model="menuEndDate" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="endDate" label="End Date" prepend-icon="mdi-calendar"
                                        readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="endDate" @input="menuEndDate = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row align="center">
                        <v-col sm="6">
                            <v-select :items="template" label="Template" v-model="templateSelect"></v-select>
                        </v-col>
                        <v-col sm="6">
                            <v-select :items="timesPerDay" label="Times per day" v-model="timesPerDaySelect"
                                v-if="templateSelect == 'Daily'"></v-select>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="icon-selector">
                        <v-col sm="6">
                            <v-list>
                                <v-list-item-group :mandatory="true" v-model="selectedIcon">
                                    <v-list-item v-for="(icon, i) in icons" :key="i">
                                        <v-list-item-icon>
                                            <v-icon :class="icon.color + '--text'">{{icon.icon}}</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="icon.text"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-col>
                    </v-row>

                </v-form>

            </v-container>
            <v-card-actions>
                <v-spacer />
                <v-btn text color="primary" @click="closeDialog">Cancel</v-btn>
                <v-btn text @click="addNewTask">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {functions} from '@/fb'
    export default {
        props: {
            dialog: Boolean
        },
        data: () => ({
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            valid: true,
            menuStartDate: false,
            menuEndDate: false,
            taskName: "",
            template: ['Daily', 'Every other day', 'Once a week', 'Once a month'],
            templateSelect: "Daily",
            timesPerDay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            timesPerDaySelect: 1,
            icons: [
                {
                    icon: 'mdi-star',
                    text: 'Star',
                    color: "green"
                },
                {
                    icon: 'mdi-send',
                    text: 'Send',
                    color: "blue"
                },
                {
                    icon: 'mdi-email-open',
                    text: 'Email',
                    color: "purple"
                },
                {
                    icon: 'mdi-pill',
                    text: 'Pill',
                    color: "orange"
                },
                {
                    icon: 'mdi-weight-lifter',
                    text: 'Excercise',
                    color: "indigo"
                },
                {
                    icon: 'mdi-baby-carriage',
                    text: 'Baby',
                    color: "pink"
                },
                {
                    icon: 'mdi-briefcase',
                    text: 'Work',
                    color: "red"
                },
                {
                    icon: 'mdi-check',
                    text: 'Check',
                    color: "deep-purple"
                },
                {
                    icon: 'mdi-glass-pint-outline',
                    text: 'Glass',
                    color: "cyan"
                },
                {
                    icon: 'mdi-human-baby-changing-table',
                    text: 'Baby 2',
                    color: "teal"
                }
            ],
                selectedIcon: 0,
        }),
        methods: {
            closeDialog: function () {
                this.$emit('closeDialog');
            },
            addNewTask: function () {
                const addTask = functions.httpsCallable('addTask');
                addTask({ 
                    name: this.taskName,
                    icon: {
                        color: this.icons[this.selectedIcon].color,
                        name: this.icons[this.selectedIcon].icon
                    },
                    startDate: this.startDate,
                    endDate: this.endDate,
                    template: this.templateSelect,
                    timesPerDay: this.timesPerDaySelect
                })
                .then(() => {
                    this.startDate = new Date().toISOString().substr(0, 10);
                    this.endDate = new Date().toISOString().substr(0, 10);
                    this.selectedIcon = 0;
                    this.templateSelect = "Daily";
                    this.timesPerDaySelect = 1;
                    this.taskName = "";
                    this.$emit('closeDialog');
                })
                .catch(error => {
                    console.log(error.message);
                });
            }
        }
    }
</script>

<style>
.icon-selector {
    max-height: 250px;
    overflow: auto;
    margin-top: -30px;
}

</style>
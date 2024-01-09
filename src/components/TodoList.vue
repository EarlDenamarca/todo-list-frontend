<template>
    <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">
            <h1>Vue ToDo List</h1>
            <div class="card-container">
                <v-card 
                    width="900"
                    class="mx-auto my-8"
                    elevation="16"
                >
                    <v-card-item>
                        <div class="card-header">
                            <v-btn 
                                class="card-header-button"
                                size="large"
                                color="blue-darken-3"
                                v-on:click="clickTasks"
                            >
                                Tasks
                                <template v-slot:append>
                                    <v-badge
                                    color="white"
                                    v-bind:content="todo_tasks"
                                    inline
                                    ></v-badge>
                                </template>
                            </v-btn>
                            <v-btn 
                                class="card-header-button"
                                size="large"
                                color="blue-darken-3"
                            >
                                Tasks Done
                                <template v-slot:append>
                                    <v-badge
                                    color="white"
                                    v-bind:content="done_tasks"
                                    inline
                                    ></v-badge>
                                </template>
                            </v-btn>
                            <v-btn 
                                class="card-header-button"
                                size="large"
                                append-icon="mdi-trash-can"
                                color="red-darken-3"
                            >
                                Tasks Done
                            </v-btn>
                            <v-btn 
                                class="card-header-button"
                                size="large"
                                append-icon="mdi-trash-can"
                                color="red-darken-3"
                            >
                                Tasks
                            </v-btn>
                        </div>
                        <v-container>
                            <v-row no-gutters>
                                <v-col
                                    cols="12"
                                    sm="12"
                                >
                                    <v-sheet class="ma-2 pa-2 todo-items" v-for="task in tasks">
                                        <v-row no-gutters>
                                            <v-col sm="2">
                                                <v-sheet class="ma-2" style="text-align: left;">
                                                    <v-btn icon="mdi-check" color="grey-lighten-4" size="small"></v-btn>
                                                </v-sheet>
                                            </v-col>
                                            <v-col sm="8">
                                                <v-sheet class="ma-2 pa-2">
                                                    {{ task.todo }}
                                                </v-sheet>
                                            </v-col>
                                            <v-col sm="2">
                                                <v-sheet class="ma-2" style="text-align: right;">
                                                    <v-btn icon="mdi-delete" size="small" color="red-darken-3" class="mr-1 ml-1"></v-btn>
                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-sheet>
                                </v-col>

                                <v-col
                                    cols="12"
                                    sm="12"
                                >
                                    <v-sheet class="">
                                        <v-row no-gutters>
                                            <v-col sm="12">
                                                <v-sheet class="ma-2 pa-2">
                                                    <v-text-field
                                                        label="New Task"
                                                        append-inner-icon=""
                                                        variant="solo"
                                                        v-model="new_task"
                                                        v-on:keyup.enter="createTask"
                                                        style="margin: 0;"
                                                    >
                                                        <template #append-inner>
                                                            <v-btn 
                                                                icon="mdi-plus" 
                                                                size="small" 
                                                                color="blue-darken-3"
                                                                v-on:click="createTask"
                                                            ></v-btn>
                                                        </template>  
                                                    </v-text-field>
                                                </v-sheet>
                                            </v-col>
                                        </v-row>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-item>
                </v-card>
            </div>
        </v-responsive>
    </v-container>
</template>

<style scoped>
    .card-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-header {
        padding: 10px;
        text-align: right;
    }

    .card-header-button {
        margin-left: 5px;
        margin-right: 5px;
    }

    .card-header-button:first-child {
        margin-left: 0px;
        margin-right: 5px;
    }
    .card-header-button:last-child {
        margin-left: 5px;
        margin-right: 0px;
    }

    .card-content {
        min-height: 400px;
        max-height: 400px;
        overflow-y: auto;
    }

    .todo-items {
        border: 2px solid #c2c2c2;
        border-radius: 10px;
    }
</style>
  
<script>
    import instance from '../utils/connection';
    import Swal from 'sweetalert2';

    export default {
        data() {
            return {
                tasks: [],
                todo_tasks: 0,
                done_tasks: 0,
                new_task: '',
                validation: false
            }
        },
        created() {
            this.fetchTasks();
        },
        methods: {
            fetchTasks()
            {
                instance.get(
                    'todos' 
                ).then( ( response ) => {
                    this.tasks = response.data;
                    this.tasks.forEach( ( task ) => {
                        if ( task?.is_done ) {
                            this.done_tasks++;
                        } else {
                            this.todo_tasks++;
                        }
                    } );
                } ).catch( ( response ) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops! Something went wrong.",
                        text: response.message
                    });
                } );
            },
            createTask() 
            {
                this.validateInput();

                if ( this.validation ) {
                    instance.post(
                        'todo',
                        {
                            todo: this.new_task
                        }
                    ).then( ( response ) => {
                        this.tasks.push( response.data );
                    } ).catch( ( response ) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops! Something went wrong.",
                            text: response.message
                        });
                    } );
                }
            },
            validateInput()
            {
                const new_task = String( this.new_task );
                if ( new_task.trim() === '' ) {
                    this.validation = false;
                    Swal.fire({
                        icon: "error",
                        title: "Oops! Something went wrong.",
                        text: "New Task field is required."
                    });
                } else {
                    this.validation = true;
                }
            },
            clickTasks() 
            {
                
            }
        }
    }
</script>
  
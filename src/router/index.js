import { createRouter, createWebHistory } from "vue-router";
import TodoList from '../components/TodoList.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
    {
        path: '/',
        component: TodoList
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        name: 'PageNotFound'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
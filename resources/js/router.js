import { createRouter, createWebHistory } from 'vue-router';
import UserList from './Components/UserList.vue';
import EditUser from './Components/EditUser.vue';

const routes = [
    {
        path: '/users',
        name: 'user-list',
        component: UserList
    },
    {
        path: '/users/:user/edit',
        name: 'users.edit',
        component: EditUser,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

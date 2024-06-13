import { createWebHistory, createRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Home from "../components/Home.vue";
import tweet from "@/components/Tweet.vue";
import newTweet from "@/components/NewTweet.vue";
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Dashboard from '@/components/Dashboard.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/tweet', component: tweet },
    { path: '/newTweet', component: newTweet },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user');

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
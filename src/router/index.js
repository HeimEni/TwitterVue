import { createWebHistory, createRouter } from "vue-router";
import Navbar from "../components/navbar.vue";
import Home from "../components/home.vue";

const routes = [
    { path: '/', component: Navbar },
    { path: '/tweet', component: Navbar },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
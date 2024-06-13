import { createWebHistory, createRouter } from "vue-router";
import Navbar from "../components/navbar.vue";
import Home from "../components/home.vue";
import tweet from "@/components/tweet.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/tweet', component: tweet },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
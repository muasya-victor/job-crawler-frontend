import {createRouter, createWebHistory} from "vue-router";
import LoginPage from "@/pages/auth/LoginPage.vue";
import Registration from "@/pages/auth/Registration.vue";
import PendingJobList from "@/pages/Dashboard/AttemptedJobs.vue";
import AvailableJobs from "@/pages/Dashboard/AvailableJobs.vue";
import UserPortfolio from "@/pages/Dashboard/UserPortfolio.vue";
import AttemptedJobs from "@/pages/Dashboard/AttemptedJobs.vue";


const routes = [
    {
        name: 'auth',
        path: '/',
        component: LoginPage
    }
    ,{
        name: 'login',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'register',
        path: '/register',
        component: Registration
    },
    {
        name: 'attempted-jobs',
        path: '/attempted-jobs',
        component: AttemptedJobs
    },
    {
        name: 'available-job',
        path: '/jobs',
        component: AvailableJobs
    },
    {
        name: 'portfolio',
        path: '/portfolio',
        component: UserPortfolio
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
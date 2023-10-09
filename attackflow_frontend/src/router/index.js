import { createRouter, createWebHistory} from "vue-router";
import Home from "@/components/home/Home.vue";
import Registration from "@/components/login/Registration.vue";
import Login from "@/components/login/Login.vue";
import Upload from "@/components/upload/Upload.vue";
import Database from "@/components/database/Database.vue";
import Detail from "@/components/database/Detail.vue";
import Annotator from "@/components/annotator/Annotator.vue";
import Admin from "@/components/admin/Admin.vue";
import Profile from "@/components/annotator/profile/Profile.vue";
import Annotation from "@/components/annotation/Annotation.vue";



const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: Registration
    },
    {
        path:'/login',
        component: Login
    },
    {
        path: '/upload',
        component: Upload
    },
    {
        path: '/database',
        component: Database
    },

    {
        path: '/annotator',
        component: Annotator,
        children: [
            {
                path: 'view_profile',
                component: Profile

            }
        ]
    },
    {
        path: '/admin',
        component: Admin
    },
    {
        path: '/annotation',
        name: 'Annotation',
        component: Annotation,
        props: true,
    },
    {
        path: '/database/:id',
        component: Detail
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;
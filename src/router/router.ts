import Home from '@/page/Home.vue';
import Login from '@/page/Login.vue';
import Register from '@/page/Register.vue';
import CreateNote from '@/page/notes/Create.vue';
import { useAuthStore } from '@/store/auth.store';
import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

enum RouteAuthType {
    NONE = 'NONE',
    ANONYMOUS = 'ANONYMOUS',
    ALL = 'ALL',
    ADMIN = 'ADMIN'
}

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        alias: '/dashboard',
        name: 'home',
        component: Home,
        meta: {
            auth: RouteAuthType.ALL
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: RouteAuthType.NONE
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: RouteAuthType.NONE
        }
    },
    {
        path: '/create-note',
        name: 'create-note',
        component: CreateNote,
        meta: {
            auth: RouteAuthType.ALL
        }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log(to.name);
    const authStore = useAuthStore();
    await authStore.init();
    if (to.meta.auth !== RouteAuthType.NONE) {
        // check if logged in
        if (!authStore.isLoggedIn() && to.meta.auth != RouteAuthType.ANONYMOUS) {
            return { name: 'login' }
        }
    }
});

export default router;
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        alias: "/",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: {
            authRequired: false,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
            authRequired: true,
        },
    },
    //     {
    //     path: "*",
    //     name: "NotFound",
    //     component: NotFound,
    //     meta: {
    //       global: true,
    //     },
    //   },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.authRequired)) {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next({
                name: "Login",
                params: to.params,
                query: {
                    nextPath: to.name,
                },
            });
        }
    } else if (to.matched.some((record) => record.meta.global)) {
        next();
    } else {
        if (store.getters.isLoggedIn) {
            next({
                name: "Dashboard",
            });
        } else {
            next();
        }
    }
});

export default router;

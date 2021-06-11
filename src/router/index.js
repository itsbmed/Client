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
    {
        path: "/patient",
        name: "Patient",
        component: () => import("@/views/Patient.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: "/patient/hospitalise",
        name: "Hospitalise",
        component: () => import("@/components/Patient/Hospitalise/index.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: "/patient/extern",
        name: "Extern",
        component: () => import("@/components/Patient/Extern/index.vue"),
        meta: {
            authRequired: true,
        },
    },
    {
        path: "/admin-panel",
        component: () => import("@/views/AdminPanel.vue"),
        meta: {
            authRequired: true,
            adminRequired: true,
        },
        children: [
            {
                path: "",
                name: "AdminPanel",
                alias: "analytics",
                component: () =>
                    import("@/components/AdminPanel/Analytics.vue"),
                meta: {
                    authRequired: true,
                    adminRequired: true,
                },
            },
            {
                path: "/profile",
                name: "Profile",
                component: () =>
                    import("@/components/AdminPanel/ProfileEdit.vue"),
                meta: {
                    authRequired: true,
                    adminRequired: true,
                },
            },
            {
                path: "add-agent",
                name: "AddAgent",
                component: () => import("@/components/AdminPanel/AddAgent.vue"),
                meta: {
                    authRequired: true,
                    adminRequired: true,
                },
            },
            {
                path: "agents",
                name: "Agents",
                component: () => import("@/components/AdminPanel/Agents.vue"),
                meta: {
                    authRequired: true,
                    adminRequired: true,
                },
            },
        ],
    },

    {
        path: "*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
        meta: {
            global: true,
        },
    },
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.adminRequired)) {
        if (store.getters.getAgent?.isAdmin === true) {
            next();
        } else {
            next({
                name: "Dashboard",
            });
        }
    } else if (to.matched.some((record) => record.meta.authRequired)) {
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

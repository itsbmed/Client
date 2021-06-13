import axios from "axios";
import store from "@/store";
import Vue from "vue";

axios.defaults.baseURL = "http://localhost:3030/api/v1";

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    let accessToken = await store.getters.getToken;
    let isLoggedIn = store.getters.isLoggedIn;
    if (isLoggedIn === true) {
        config.headers.common["x-auth-token"] = accessToken;
        return config;
    } else {
        if (isLoggedIn === true) {
            store.dispatch("destroySession");
            Vue.prototype.$notify({
                group: "errors",
                type: "error",
                title: "Unauthorized",
                text: "unauthorized request !!",
            });
        }
        return config;
    }
});
axios.interceptors.response.use(
    async function (config) {
        return config;
    },
    async function (config) {
        if (config.response?.status === 401) {
            await store.dispatch("logout");
        } else return config;
    }
);

Vue.prototype.$axios = axios;

export default axios;

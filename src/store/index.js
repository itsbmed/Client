import Vue from "vue";
import Vuex from "vuex";
import axios from "@/plugins/axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        accessToken: localStorage.getItem("accessToken") || "",
        agent: JSON.parse(localStorage.getItem("agent")) || {},
    },
    mutations: {
        AUTH_SUCCESS: (state, payload) => {
            state.accessToken = payload.accessToken;
            state.agent = payload.agent;
            localStorage.setItem("accessToken", payload.accessToken);
            localStorage.setItem("agent", JSON.stringify(payload.agent));
        },
        DESTROY_SESSION: (state) => {
            state.agent = {};
            state.accessToken = "";
            localStorage.removeItem("accessToken");
            localStorage.removeItem("agent");
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.accessToken,
        getAgent: (state) => state.agent,
    },
    actions: {
        signIn: (context, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/agents", payload)
                    .then((res) => {
                        context.commit("AUTH_SUCCESS", {
                            accessToken: res.data.accessToken,
                            agent: res.data.agent,
                        });
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        logout: (context) => {
            context.commit("DESTROY_SESSION");
        },
    },
});
export default store;

import axios from "@/plugins/axios";

let agent = {};
try {
    agent = JSON.parse(localStorage.getItem("agent"));
} catch (err) {
    localStorage.clear();
}

export default {
    state: {
        accessToken: localStorage.getItem("accessToken") || "",
        agent,
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
        getToken: (state) => state.accessToken,
    },
    actions: {
        signIn: (context, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post("/sign-in", payload)
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
        async logout(context) {
            await context.commit("DESTROY_SESSION");
            window.location.reload();
        },
    },
};

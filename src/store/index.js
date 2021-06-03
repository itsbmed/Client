import Vue from "vue";
import Vuex from "vuex";
import Auth from "./Auth";
import Patient from "./Patient";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
        Patient,
    },
});

import Vue from "vue";
import Vuex from "vuex";
import Auth from "./Auth";
import Patient from "./Patient";
import Episode from "./Episode";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
        Patient,
        Episode,
    },
});

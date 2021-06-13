import Vue from "vue";
import Vuex from "vuex";
import Auth from "./Auth";
import Patient from "./Patient";
import Episode from "./Episode";
import Bill from "./Bill";
import Analytics from "./Analytics";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Auth,
        Patient,
        Episode,
        Bill,
        Analytics,
    },
});

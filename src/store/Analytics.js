import axios from "@/plugins/axios";
export default {
    state: {
        hospAnalytics: {
            potential: {},
            paid: {},
            ramed: {},
            cnops: {},
            mafar: {},
            cnss: {},
            organism: {},
        },
        extAnalytics: {
            potential: {},
            paid: {},
            ramed: {},
            cnops: {},
            mafar: {},
            cnss: {},
            organism: {},
        },
    },
    mutations: {
        INIT_HOSP_ANALYTICS(state, payload) {
            payload.forEach((el) => {
                switch (el.category) {
                    case "PAID":
                        state.hospAnalytics.paid = el;
                        break;
                    case "POTENTIAL":
                        state.hospAnalytics.potential = el;
                        break;
                    case "RAMED":
                        state.hospAnalytics.ramed = el;
                        break;
                    case "CNOPS":
                        state.hospAnalytics.cnops = el;
                        break;
                    case "MAFAR":
                        state.hospAnalytics.mafar = el;
                        break;
                    case "CNSS":
                        state.hospAnalytics.cnss = el;
                        break;
                    case "ORGANISM":
                        state.hospAnalytics.organism = el;
                        break;
                }
            });
        },
        INIT_EXT_ANALYTICS(state, payload) {
            payload.forEach((el) => {
                switch (el.category) {
                    case "PAID":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.paid.radio = el;
                        else state.extAnalytics.paid.lab = el;
                        break;
                    case "POTENTIAL":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.potential.radio = el;
                        else state.extAnalytics.potential.lab = el;
                        break;
                    case "RAMED":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.ramed.radio = el;
                        else state.extAnalytics.ramed.lab = el;
                        break;
                    case "CNOPS":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.cnops.radio = el;
                        else state.extAnalytics.cnops.lab = el;
                        break;
                    case "MAFAR":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.mafar.radio = el;
                        else state.extAnalytics.mafar.lab = el;
                        break;
                    case "CNSS":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.cnss.radio = el;
                        else state.extAnalytics.cnss.lab = el;
                        break;
                    case "ORGANISM":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.organism.radio = el;
                        else state.extAnalytics.organism.lab = el;
                        break;
                }
            });
        },
        CLEAR_ANALYTICS(state) {
            state.hospAnalytics = [];
            state.extAnalytics = [];
        },
    },
    getters: {
        extAnalytics: (state) => state.extAnalytics,
        hospAnalytics: (state) => state.hospAnalytics,
    },
    actions: {
        getHospAnalytics(context, [from, to]) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/statistics?type=hospitalized&from=${from}&to=${to}`)
                    .then((res) => {
                        console.log(res.data);
                        context.commit("INIT_HOSP_ANALYTICS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },

        getExtAnalytics(context, [from, to]) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/statistics?type=external&from=${from}&to=${to}`)
                    .then((res) => {
                        console.log(res.data);
                        context.commit("INIT_EXT_ANALYTICS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        async clearAnalytics(context) {
            await context.commit("CLEAR_ANALYTICS");
        },
    },
};

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
        extAmountTotals: [],
        hospAmountTotals: [],
        extEpisodeCounts: [],
        hospEpisodeCounts: [],
    },
    mutations: {
        INIT_HOSP_ANALYTICS(state, payload) {
            state.hospAmountTotals.length = 7;
            state.hospEpisodeCounts.length = 7;

            payload.forEach((el) => {
                switch (el.category) {
                    case "PAID":
                        state.hospAnalytics.paid = el;
                        state.hospAmountTotals[0] = el.amountTotal;
                        state.hospEpisodeCounts[0] = el.episodeCount;
                        break;
                    case "POTENTIAL":
                        state.hospAnalytics.potential = el;
                        state.hospAmountTotals[1] = el.amountTotal;
                        state.hospEpisodeCounts[1] = el.episodeCount;
                        break;
                    case "RAMED":
                        state.hospAnalytics.ramed = el;
                        state.hospAmountTotals[2] = el.amountTotal;
                        state.hospEpisodeCounts[2] = el.episodeCount;
                        break;
                    case "CNOPS":
                        state.hospAnalytics.cnops = el;
                        state.hospAmountTotals[3] = el.amountTotal;
                        state.hospEpisodeCounts[3] = el.episodeCount;
                        break;
                    case "MAFAR":
                        state.hospAnalytics.mafar = el;
                        state.hospAmountTotals[4] = el.amountTotal;
                        state.hospEpisodeCounts[4] = el.episodeCount;
                        break;
                    case "CNSS":
                        state.hospAnalytics.cnss = el;
                        state.hospAmountTotals[5] = el.amountTotal;
                        state.hospEpisodeCounts[5] = el.episodeCount;
                        break;
                    case "ORGANISM":
                        state.hospAnalytics.organism = el;
                        state.hospAmountTotals[6] = el.amountTotal;
                        state.hospEpisodeCounts[6] = el.episodeCount;
                        break;
                }
            });
        },
        INIT_EXT_ANALYTICS(state, payload) {
            state.extAmountTotals.length = 7;
            state.extEpisodeCounts.length = 7;
            payload.forEach((el) => {
                switch (el.category) {
                    case "PAID":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.paid.radio = el;
                        else state.extAnalytics.paid.lab = el;
                        state.extAmountTotals[0] = el.amountTotal;
                        state.extEpisodeCounts[0] = el.episodeCount;
                        break;
                    case "POTENTIAL":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.potential.radio = el;
                        else state.extAnalytics.potential.lab = el;
                        state.extAmountTotals[1] = el.amountTotal;
                        state.extEpisodeCounts[1] = el.episodeCount;
                        break;
                    case "RAMED":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.ramed.radio = el;
                        else state.extAnalytics.ramed.lab = el;
                        state.extAmountTotals[2] = el.amountTotal;
                        state.extEpisodeCounts[2] = el.episodeCount;
                        break;
                    case "CNOPS":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.cnops.radio = el;
                        else state.extAnalytics.cnops.lab = el;
                        state.extAmountTotals[3] = el.amountTotal;
                        state.extEpisodeCounts[3] = el.episodeCount;
                        break;
                    case "MAFAR":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.mafar.radio = el;
                        else state.extAnalytics.mafar.lab = el;
                        state.extAmountTotals[4] = el.amountTotal;
                        state.extEpisodeCounts[4] = el.episodeCount;
                        break;
                    case "CNSS":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.cnss.radio = el;
                        else state.extAnalytics.cnss.lab = el;
                        state.extAmountTotals[5] = el.amountTotal;
                        state.extEpisodeCounts[5] = el.episodeCount;
                        break;
                    case "ORGANISM":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.organism.radio = el;
                        else state.extAnalytics.organism.lab = el;
                        state.extAmountTotals[6] = el.amountTotal;
                        state.extEpisodeCounts[6] = el.episodeCount;
                        break;
                }
            });
        },
        CLEAR_ANALYTICS(state) {
            state.hospAnalytics.potential = {};
            state.hospAnalytics.paid = {};
            state.hospAnalytics.ramed = {};
            state.hospAnalytics.cnops = {};
            state.hospAnalytics.mafar = {};
            state.hospAnalytics.cnss = {};
            state.hospAnalytics.organism = {};
            state.extAnalytics.potential = {};
            state.extAnalytics.paid = {};
            state.extAnalytics.ramed = {};
            state.extAnalytics.cnops = {};
            state.extAnalytics.mafar = {};
            state.extAnalytics.cnss = {};
            state.extAnalytics.organism = {};
            state.extAmountTotals = [];
            state.hospAmountTotals = [];
            state.extEpisodeCounts = [];
            state.hospEpisodeCounts = [];
        },
    },
    getters: {
        extAnalytics: (state) => state.extAnalytics,
        hospAnalytics: (state) => state.hospAnalytics,
        extAmountTotals: (state) => state.extAmountTotals,
        extEpisodeCounts: (state) => state.extEpisodeCounts,
        hospAmountTotals: (state) => state.hospAmountTotals,
        hospEpisodeCounts: (state) => state.hospEpisodeCounts,
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

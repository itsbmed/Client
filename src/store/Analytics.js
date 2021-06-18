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
            hospital: {
                potential: {},
                paid: {},
                ramed: {},
                cnops: {},
                mafar: {},
                cnss: {},
                organism: {},
            },
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
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.paid = el;
                        else state.hospAnalytics.paid = el;
                        state.hospAmountTotals[0] = el.amountTotal;
                        state.hospEpisodeCounts[0] = el.episodeCount;
                        break;
                    case "POTENTIAL":
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.potential = el;
                        else state.hospAnalytics.potential = el;
                        state.hospAmountTotals[1] = el.amountTotal;
                        state.hospEpisodeCounts[1] = el.episodeCount;
                        break;
                    case "RAMED":
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.ramed = el;
                        else state.hospAnalytics.ramed = el;
                        state.hospAmountTotals[2] = el.amountTotal;
                        state.hospEpisodeCounts[2] = el.episodeCount;
                        break;
                    case "CNOPS":
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.cnops = el;
                        else state.hospAnalytics.cnops = el;
                        state.hospAmountTotals[3] = el.amountTotal;
                        state.hospEpisodeCounts[3] = el.episodeCount;
                        break;
                    case "MAFAR":
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.mafar = el;
                        else state.hospAnalytics.mafar = el;
                        state.hospAmountTotals[4] = el.amountTotal;
                        state.hospEpisodeCounts[4] = el.episodeCount;
                        break;
                    case "CNSS":
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.cnss = el;
                        else state.hospAnalytics.cnss = el;
                        state.hospAmountTotals[5] = el.amountTotal;
                        state.hospEpisodeCounts[5] = el.episodeCount;
                        break;
                    case "ORGANISM":
                        if (el.hospitalDay)
                            state.hospAnalytics.hospital.organism = el;
                        else state.hospAnalytics.organism = el;
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
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.paid.consultation = el;
                        else state.extAnalytics.paid.lab = el;
                        state.extAmountTotals[0] = el.amountTotal;
                        state.extEpisodeCounts[0] = el.episodeCount;
                        break;
                    case "POTENTIAL":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.potential.radio = el;
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.potential.consultation = el;
                        else state.extAnalytics.potential.lab = el;
                        state.extAmountTotals[1] = el.amountTotal;
                        state.extEpisodeCounts[1] = el.episodeCount;
                        break;
                    case "RAMED":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.ramed.radio = el;
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.ramed.consultation = el;
                        else state.extAnalytics.ramed.lab = el;
                        state.extAmountTotals[2] = el.amountTotal;
                        state.extEpisodeCounts[2] = el.episodeCount;
                        break;
                    case "CNOPS":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.cnops.radio = el;
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.cnops.consultation = el;
                        else state.extAnalytics.cnops.lab = el;
                        state.extAmountTotals[3] = el.amountTotal;
                        state.extEpisodeCounts[3] = el.episodeCount;
                        break;
                    case "MAFAR":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.mafar.radio = el;
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.mafar.consultation = el;
                        else state.extAnalytics.mafar.lab = el;
                        state.extAmountTotals[4] = el.amountTotal;
                        state.extEpisodeCounts[4] = el.episodeCount;
                        break;
                    case "CNSS":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.cnss.radio = el;
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.cnss.consultation = el;
                        else state.extAnalytics.cnss.lab = el;
                        state.extAmountTotals[5] = el.amountTotal;
                        state.extEpisodeCounts[5] = el.episodeCount;
                        break;
                    case "ORGANISM":
                        if (el.presentationNature == "RADIO")
                            state.extAnalytics.organism.radio = el;
                        else if (el.presentationNature == "CONSULTATION")
                            state.extAnalytics.organism.consultation = el;
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
            state.hospAnalytics.hospital.potential = {};
            state.hospAnalytics.hospital.paid = {};
            state.hospAnalytics.hospital.ramed = {};
            state.hospAnalytics.hospital.cnops = {};
            state.hospAnalytics.hospital.mafar = {};
            state.hospAnalytics.hospital.cnss = {};
            state.hospAnalytics.hospital.organism = {};

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
        getHospAnalytics(context, [from, to, totalOf, service, admType]) {
            return new Promise((resolve, reject) => {
                let url = `/analytics?type=hospitalized&from=${from}&to=${to}&totalOf=${totalOf}`;
                if (service) url += `&service=${service}`;
                if (admType) url += `&admType=${admType}`;

                axios
                    .get(url)
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

        getExtAnalytics(context, [from, to, totalOf, service, admType]) {
            return new Promise((resolve, reject) => {
                let url = `/analytics?type=external&from=${from}&to=${to}&totalOf=${totalOf}`;
                if (service) url += `&service=${service}`;
                if (admType) url += `&admType=${admType}`;

                axios
                    .get(url)
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

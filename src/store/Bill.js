import axios from "@/plugins/axios";
export default {
    state: {
        billData: {},
        hospBills: [],
        extBills: [],
    },
    mutations: {
        CLEAR_BILL_DATA(state) {
            state.billData = {};
        },
        ADD_HOSP_BILLS(state, payload) {
            state.hospBills = payload;
        },
        PUSH_HOSP_BILLS(state, payload) {
            state.hospBills.push(...payload);
        },
        ADD_EXT_BILLS(state, payload) {
            state.extBills = payload;
        },
        PUSH_EXT_BILLS(state, payload) {
            state.extBills.push(...payload);
        },
        UPDATE_EXT_BILL(state, [payload, index]) {
            state.extBills[index] = payload;
        },
        UPDATE_HOSP_BILL(state, [payload, index]) {
            state.hospBills[index] = payload;
        },
        CLEAR_BILLS(state) {
            state.extBills = [];
            state.hospBills = [];
        },
    },
    getters: {
        billData: (state) => state.billData,
        extBills: (state) => state.extBills,
        hospBills: (state) => state.hospBills,
    },
    actions: {
        saveBill(context, [payload, episodeId]) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/episodes/${episodeId}/bills`, payload)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getHospBills(context, ipp) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/bills?patientId=${ipp}&type=hospitalized`)
                    .then((res) => {
                        context.commit("ADD_HOSP_BILLS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        pushHospBills(context, [ipp, page]) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `/bills?patientId=${ipp}&type=hospitalized&page=${page}`
                    )
                    .then((res) => {
                        context.commit("PUSH_HOSP_BILLS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getExtBills(context, ipp) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/bills?patientId=${ipp}&type=external`)
                    .then((res) => {
                        context.commit("ADD_EXT_BILLS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        pushExtBills(context, [ipp, page]) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/bills?patientId=${ipp}&type=external&page=${page}`)
                    .then((res) => {
                        context.commit("PUSH_EXT_BILLS", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        async updateExtBill(context, [payload, index]) {
            await context.commit("UPDATE_EXT_BILL", [payload, index]);
        },
        async updateHospBill(context, [payload, index]) {
            await context.commit("UPDATE_HOSP_BILL", [payload, index]);
        },
        async clearBillData(context) {
            await context.commit("CLEAR_BILL_DATA");
        },
        async clearBills(context) {
            await context.commit("CLEAR_BILLS");
        },
    },
};

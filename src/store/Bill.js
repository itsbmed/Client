import axios from "@/plugins/axios";
export default {
    state: {
        billData: {},
    },
    mutations: {
        CLEAR_BILL_DATA(state) {
            state.billData = {};
        },
    },
    getters: {
        billData: (state) => state.billData,
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
        async clearBillData(context) {
            await context.commit("CLEAR_BILL_DATA");
        },
    },
};

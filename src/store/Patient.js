import axios from "@/plugins/axios";
export default {
    state: {
        patientData: {},
        hospStep: 1,
        extStep: 1,
        caseType: null,
    },
    mutations: {
        CHANGE_HOSP_STEP: (state, step) => {
            state.hospStep = step;
        },
        CHANGE_EXT_STEP: (state, step) => {
            state.extStep = step;
        },
        UPDATE_PATIENT_DATA: (state, payload) => {
            state.patientData = payload;
        },
        CLEAR_PATIENT_DATA: (state) => {
            let ipp = state.patientData.ipp;
            state.patientData = { ipp };
        },
    },
    getters: {
        hospStep: (state) => state.hospStep,
        extStep: (state) => state.extStep,
        patientData: (state) => state.patientData,
    },
    actions: {
        changeHospStep(context, step) {
            context.commit("CHANGE_HOSP_STEP", step);
        },
        changeExtStep(context, step) {
            context.commit("CHANGE_EXT_STEP", step);
        },
        checkExistence(context, ipp) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/patients/${ipp}`)
                    .then((res) => {
                        context.commit("UPDATE_PATIENT_DATA", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        addPatient(context, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/patients`, payload)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        clearPetientData(context) {
            context.commit("CLEAR_PATIENT_DATA");
        },
    },
};

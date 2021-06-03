export default {
    state: {
        PatientData: {},
        hospStep: 1,
        extStep: 1,
        caseType: null,
    },
    mutations: {
        CHANGE_CASE_TYPE: (state, type) => {
            state.caseType = type;
        },
        CHANGE_HOSP_STEP: (state, step) => {
            state.hospStep = step;
        },
        CHANGE_EXT_STEP: (state, step) => {
            state.extStep = step;
        },
    },
    getters: {
        hospStep: (state) => state.hospStep,
        extStep: (state) => state.extStep,
        caseType: (state) => state.caseType,
        patientData: (state) => state.PatientData,
    },
    actions: {
        changeCaseType(context, type) {
            context.commit("CHANGE_CASE_TYPE", type);
        },
        changeHospStep(context, step) {
            context.commit("CHANGE_HOSP_STEP", step);
        },
        changeExtStep(context, step) {
            context.commit("CHANGE_EXT_STEP", step);
        },
    },
};

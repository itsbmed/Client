<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <v-form ref="patient" lazy-validation>
                    <v-text-field
                        v-model="patientData.ipp"
                        type="number"
                        :rules="ippRule"
                        outlined
                        class="rounded-lg"
                        placeholder="Ipp"
                        label="Ipp"
                        @keyup="checkIpp"
                        @focus="checkIpp"
                    />
                    <v-text-field
                        :disabled="alreadyRegistered"
                        v-model="patientData.lastName"
                        :rules="lastnameRule"
                        outlined
                        class="rounded-lg mt-3"
                        placeholder="Nom de patient"
                        label="Nom de patient"
                        required
                    />
                    <v-text-field
                        :disabled="alreadyRegistered"
                        v-model="patientData.firstName"
                        outlined
                        :rules="firstnameRule"
                        class="rounded-lg mt-3"
                        placeholder="Prenom de patient"
                        label="Prenom de patient"
                    />
                </v-form>
            </v-card>
        </div>
        <div class="d-flex justify-center">
            <router-link to="/patient" class="rm-underline">
                <v-btn
                    text
                    elevation="0"
                    width="100"
                    class="mr-5"
                    color="blue"
                    height="35"
                >
                    <v-icon left small> mdi-arrow-left</v-icon>

                    prec
                </v-btn>
            </router-link>
            <v-btn
                elevation="0"
                color="primary"
                @click="nextStep"
                width="120"
                height="35"
                :loading="loading"
                :disabled="loading"
            >
                Suivant
                <v-icon right small> mdi-arrow-right</v-icon>
            </v-btn>
        </div>
    </span>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import { ippRule, firstnameRule, lastnameRule } from "@/helpers/inputsRules";

export default {
    name: "Step1",
    props: {
        caseType: { type: String, required: true },
    },
    data: () => ({
        alreadyRegistered: false,
        loading: false,
        ippRule,
        firstnameRule,
        lastnameRule,
    }),

    computed: {
        ...mapGetters(["patientData", "getIpp"]),
    },
    methods: {
        ...mapActions([
            "changeHospStep",
            "changeExtStep",
            "checkExistence",
            "addPatient",
            "updatePatientData",
            "clearPatientData",
        ]),
        checkDate() {
            if (this.patientData.nDate.length == 2) {
                this.patientData.nDate += "/";
            }
        },
        changeStep() {
            if (this.$route.path === "/patient/hospitalise")
                return this.changeHospStep(2);
            if (this.$route.path === "/patient/extern")
                return this.changeExtStep(2);
        },
        async nextStep() {
            if (!this.$refs.patient.validate()) return;
            if (!this.alreadyRegistered) {
                this.loading = true;
                try {
                    if (!this.patientData.nCode) delete this.patientData.nCode;
                    if (!this.patientData.nDate) delete this.patientData.nDate;

                    let res = await this.addPatient(this.patientData);
                    this.alreadyRegistered = true;
                    this.changeStep();
                } catch ({ response: err }) {
                    this.$notify({
                        group: "br",
                        type: "error",
                        title: "Submit error",
                        text: err.data.message,
                    });
                } finally {
                    this.loading = false;
                }
            } else {
                this.changeStep();
            }
        },

        async checkIpp() {
            if (!this.patientData.ipp) return;
            if (this.patientData.ipp.length < 6) return;
            try {
                let res = await this.checkExistence(this.patientData.ipp);
                this.alreadyRegistered = true;
            } catch ({ response: err }) {
                switch (err?.status) {
                    case 404:
                        if (this.alreadyRegistered === true) {
                            let ipp = this.patientData.ipp;
                            this.clearPatientData();
                            this.patientData.ipp = ipp;
                            this.alreadyRegistered = false;
                        }
                        break;
                }
            }
        },
    },
};
</script>

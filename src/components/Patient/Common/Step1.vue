<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <v-form ref="patient" lazy-validation>
                    <v-text-field
                        v-model="patientData.ipp"
                        filled
                        single-line
                        rounded
                        type="number"
                        :rules="iRules"
                        outlined
                        class="rounded-lg"
                        placeholder="Ipp"
                        label="Ipp"
                        @keyup="checkIpp"
                        required
                        clearable
                    />
                    <v-text-field
                        :disabled="alreadyRegistered"
                        v-model="patientData.lastName"
                        filled
                        single-line
                        rounded
                        :rules="nRules"
                        outlined
                        class="rounded-lg"
                        placeholder="Nom"
                        label="Nom"
                        required
                        clearable
                    />

                    <v-text-field
                        :disabled="alreadyRegistered"
                        v-model="patientData.firstName"
                        filled
                        single-line
                        rounded
                        outlined
                        :rules="pRules"
                        class="rounded-lg"
                        placeholder="Prenom"
                        label="Prenom"
                        required
                        clearable
                    />

                    <v-text-field
                        :disabled="alreadyRegistered"
                        v-model="patientData.nCode"
                        filled
                        :rules="ncodeRules"
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="N* de carte ou d'identifiant"
                        label="N* de carte ou d'identifiant"
                        clearable
                    />
                    <v-text-field
                        :disabled="alreadyRegistered"
                        v-model="patientData.nDate"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Date D'expirations | MM / YY"
                        label="Date D'expirations | MM / YY"
                        clearable
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

export default {
    name: "Step1",
    props: {
        caseType: { type: String, required: true },
    },
    data: () => ({
        alreadyRegistered: false,
        loading: false,
        iRules: [
            (v) => !!v || "Ipp est requis",
            (v) => (v && v.length >= 6) || "Ipp doit plus de 6 caractères",
            (v) => (v && v.length <= 10) || "Ipp doit moin de 10 caractères",
        ],
        ncodeRules: [
            (v) =>
                v.length >= 15 || "nCode doit comporter moins de 15 caractères",
        ],
        nRules: [
            (v) => !!v || "Le nom est requis",
            (v) =>
                (v && v.length <= 10) ||
                "Le nom doit comporter moins de 10 caractères",
        ],
        pRules: [
            (v) => !!v || "Le prenom est requis",
            (v) =>
                (v && v.length <= 10) ||
                "Le prenom doit comporter moins de 10 caractères",
        ],
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
            "clearPetientData",
        ]),
        changeStep() {
            if (this.$route.path === "/patient/hospitalise")
                return this.changeHospStep(2);
            if (this.$route.path === "/patient/extern")
                return this.changeExtStep(2);
        },
        async nextStep() {
            if (!this.alreadyRegistered) {
                this.loading = true;
                try {
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
            try {
                let res = await this.checkExistence(this.patientData.ipp);
                this.alreadyRegistered = true;
            } catch ({ response: err }) {
                switch (err.status) {
                    case 404:
                        if (this.alreadyRegistered === true)
                            this.clearPetientData();
                        this.alreadyRegistered = false;
                        break;
                }
            }
        },
    },
    beforeDestroy() {
        this.clearPetientData();
    },
};
</script>

<template>
    <v-stepper-content step="1" class="pa-0 ma-0">
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="patientData.Ipp"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Ipp"
                        label="Ipp"
                        required
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Nom"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Nom"
                        label="Nom"
                        required
                        clearable
                    />

                    <v-text-field
                        v-model="patientData.Prenom"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Prenom"
                        label="Prenom"
                        required
                        clearable
                    />

                    <v-text-field
                        v-model="patientData.nomdt"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="N* de carte ou d'identifiant"
                        label="N* de carte ou d'identifiant"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Dex"
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
            <v-btn
                text
                elevation="0"
                color="blue"
                @click="changeCaseType(null)"
                width="100"
                class="mr-5"
                height="35"
            >
                <v-icon left small> mdi-arrow-left</v-icon>

                prec
            </v-btn>
            <v-btn
                elevation="0"
                color="primary"
                @click="changeStep"
                width="120"
                height="35"
            >
                Suivant
                <v-icon right small> mdi-arrow-right</v-icon>
            </v-btn>
        </div>
    </v-stepper-content>
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
        patientData: {},
    }),
    computed: {
        ...mapGetters(["patientData"]),
    },
    methods: {
        ...mapActions(["changeCaseType", "changeHospStep", "changeExtStep"]),
        changeStep() {
            if (this.caseType === "hosp") return this.changeHospStep(2);
            if (this.caseType === "ext") return this.changeExtStep(2);
        },
    },
};
</script>

<style></style>

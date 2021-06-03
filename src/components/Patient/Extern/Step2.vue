<template>
    <v-stepper-content step="2" class="pa-0 ma-0">
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <div class="d-flex flex-column align-center">
                    <p class="text-center pa-0 ma-0">Type D'admission</p>
                    <v-radio-group
                        class="pa-0 mt-3 mb-4"
                        v-model="patientData.admissionType"
                        row
                    >
                        <v-radio
                            label="Urgence"
                            value="Urgence"
                            color="red"
                            class="mr-5"
                        ></v-radio>
                        <v-radio
                            label="Normale"
                            value="Normale"
                            color="#2ecc71"
                        ></v-radio>
                    </v-radio-group>
                </div>
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="patientData.Ipp"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Nature De Presentation"
                        label="Ipp"
                        required
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
                @click="changeExtStep(1)"
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
                @click="changeExtStep(3)"
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
    data: () => ({
        patientData: {},
    }),
    computed: {
        ...mapGetters(["patientData"]),
    },
    methods: {
        ...mapActions(["changeExtStep"]),
    },
};
</script>

<template>
    <v-container>
        <v-stepper v-model="hospStep" flat>
            <v-stepper-header class="v-stepper__header-flat mx-auto">
                <v-stepper-step :complete="hospStep > 1" step="1">
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="hospStep > 2" step="2">
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="hospStep > 3" step="3">
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <Step1 caseType="hosp" />
                <Step2 />
                <Step3 />
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import Step1 from "../Common/Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import { mapGetters } from "vuex";
export default {
    components: { Step1, Step2, Step3 },
    data: () => ({
        patientData: {},
        row: null,
        step: 1,
    }),
    computed: {
        ...mapGetters(["hospStep"]),
    },
};
</script>

<style>
.v-stepper__header-flat {
    box-shadow: none !important;
    max-width: 800px !important;
}
.choises span {
    color: black !important;
}
</style>

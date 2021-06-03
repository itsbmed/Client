<template>
    <v-stepper-content step="3" class="pa-0 ma-0">
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
                        v-model="patientData.date"
                        :rules="dRules"
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                        placeholder="Date"
                        onchange="this.className=(this.value!=''?'has-value':'')"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.date_ad"
                        :rules="daRules"
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                        placeholder="Date D'admission"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Service"
                        ref="Sr"
                        :counter="10"
                        :rules="srRules"
                        placeholder="Service D'hospilisation"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Situation"
                        ref="st"
                        :counter="10"
                        :rules="sRules"
                        placeholder="Situation"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Categorie"
                        ref="Ct"
                        :counter="10"
                        :rules="cRules"
                        placeholder="Categorie Comptable"
                        label="Categorie Comptable"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Tnom"
                        ref="Tn"
                        placeholder="Nom De Titulaire"
                        label="Nom De Titulaire"
                        clearable
                        outlined
                        single-line
                        class="rounded-lg"
                    />
                    <v-text-field
                        v-model="patientData.Tercure"
                        ref="Te"
                        placeholder="N*Ercure De Titulaire"
                        label="N*Ercure De Titulaire"
                        clearable
                        outlined
                        single-line
                        class="rounded-lg"
                    />
                </v-form>
            </v-card>
        </div>
        <div class="d-flex pb-10 mx-auto" style="max-width: 650px">
            <v-btn
                elevation="0"
                text
                color="blue"
                @click="changeExtStep(2)"
                class="mr-auto"
                height="45"
            >
                <v-icon left small> mdi-arrow-left</v-icon>
                prec
            </v-btn>
            <v-btn
                elevation="4"
                outlined
                color="primary"
                width="200"
                height="45"
            >
                Enregistrer
                <v-icon right small> mdi-content-save</v-icon>
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
        row: null,

        dRules: [(v) => !!v || "La date est requis"],
        daRules: [(v) => !!v || "La date d'admission est requis"],
        sRules: [(v) => !!v || "Le service d'hospilisation est requis"],
        srRules: [(v) => !!v || "Le service d'hospilisation est requis"],
        cRules: [(v) => !!v || "la categorie comptable est requis"],
    }),
    computed: {
        ...mapGetters(["patientData"]),
    },
    methods: {
        ...mapActions(["changeHospStep"]),
    },
};
</script>

<style></style>

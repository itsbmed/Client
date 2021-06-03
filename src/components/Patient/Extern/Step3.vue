<template>
    <v-stepper-content step="3" class="pa-0 ma-0">
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="patientData.NumFacture"
                        filled
                        :rules="nfRules"
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Num Facture"
                        label="Num Facture"
                        required
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Actes"
                        filled
                        :rules="aRules"
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Actes"
                        label="Actes"
                        required
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.Medicam"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Medicam"
                        label="Medicam"
                        required
                        clearable
                    />

                    <v-text-field
                        v-model="patientData.Prothes"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Prothes"
                        label="Prothes"
                        required
                        clearable
                    />

                    <v-text-field
                        v-model="patientData.Categorie"
                        filled
                        single-line
                        rounded
                        :rules="caRules"
                        outlined
                        class="rounded-lg"
                        placeholder="Categorie"
                        label="Categorie"
                        clearable
                    />
                    <v-text-field
                        v-model="patientData.NQuitance"
                        filled
                        single-line
                        rounded
                        :rules="ncRules"
                        outlined
                        class="rounded-lg"
                        placeholder="N*Quitance"
                        label="N*Quitance"
                        clearable
                    />
                </v-form>
                <span
                    >Totale Facture :
                    <span style="color: #2ecc71">
                        {{ this.patientData.Totale + " DH" }}
                    </span>
                </span>
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
        nfRules: [
            (v) => !!v || "N*Facture est requis",
            (v) => v > 0 || "La valeur doit être supérieure à zéro",
        ],
        aRules: [
            (v) => !!v || "Actes est requis",
            (v) => v > 0 || "La valeur doit être supérieure à zéro",
        ],

        caRules: [(v) => !!v || "Categorie est requis"],
        ncRules: [
            (v) => !!v || "N*Quitance est requis",
            (v) => v > 0 || "La valeur doit être supérieure à zéro",
        ],
    }),
    computed: {
        ...mapGetters(["patientData"]),
    },
    methods: {
        ...mapActions(["changeExtStep"]),
        Totale: function () {
            console.log(this.patientData.Totale);
            this.patientData.Totale =
                this.patientData.Actes +
                this.patientData.Medicame +
                this.Prothes;
            return this.patientData.Totale;
        },
    },
};
</script>

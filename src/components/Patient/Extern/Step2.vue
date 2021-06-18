<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4" max-width="700px">
                <v-form ref="episode" lazy-validation>
                    <div class="d-flex flex-column align-center">
                        <p class="text-center pa-0 ma-0">Type D'admission</p>
                        <v-radio-group
                            class="pa-0 mt-3 mb-4"
                            v-model="extEpisodeFrom.admType"
                            row
                            :rules="[required('Type D\'admission')]"
                        >
                            <v-radio
                                label="Urgence"
                                value="URGENT"
                                color="red"
                                class="mr-5"
                            ></v-radio>
                            <v-radio
                                label="Normale"
                                value="NORMAL"
                                color="#2ecc71"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                    <v-row no-gutters class="mt-2">
                        <v-col class="me-4">
                            <v-text-field
                                v-model="extEpisodeFrom.firstName"
                                :rules="firstnameRule"
                                placeholder="Prenom de l'accompagnant"
                                label="Prenom de l'accompagnant"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="extEpisodeFrom.lastName"
                                :rules="lastnameRule"
                                placeholder="Nom de l'accompagnant"
                                label="Nom de l'accompagnant"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col class="me-4">
                            <v-text-field
                                v-model="extEpisodeFrom.address"
                                :rules="addressRule"
                                placeholder="Adrress de l'accompagnant"
                                label="Adrress de l'accompagnant"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="extEpisodeFrom.cin"
                                :rules="cinRule"
                                placeholder="CIN"
                                label="CIN"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="mt-2">
                        <v-col class="me-4">
                            <v-select
                                :items="presentations"
                                :rules="[required('Nature de presentation')]"
                                placeholder="Nature de presentation"
                                label="Nature de presentation"
                                outlined
                                class="rounded-lg"
                                v-model="extEpisodeFrom.presentationNature"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                                :items="categories"
                                :rules="[required('Categorie Comptables')]"
                                placeholder="Categorie Comptables"
                                label="Categorie Comptables"
                                outlined
                                class="rounded-lg"
                                v-model="extEpisodeFrom.category"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-if="extEpisodeFrom.category == 'RAMED'">
                        <v-col class="me-4">
                            <v-text-field
                                placeholder="Numero du Ramed"
                                label="Numero du Ramed"
                                outlined
                                class="rounded-lg"
                                type="number"
                                v-model="extEpisodeFrom.ramedNum"
                                :rules="ramedNumRule"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                placeholder="Ramed Expiration Date"
                                label="Ramed Expiration Date"
                                outlined
                                onfocus="(this.type='date')"
                                onblur="(this.type='text')"
                                class="rounded-lg"
                                v-model="extEpisodeFrom.ramedExpDate"
                                :rules="[required('Ramed expiration date')]"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-2">
                        <v-col>
                            <v-select
                                v-model="extEpisodeFrom.service"
                                ref="Sr"
                                :rules="[required('Service D\'hospilisation')]"
                                :items="services"
                                placeholder="Service D'hospilisation"
                                label="Service D'hospilisation"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>
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
                @click="nextStep"
                width="120"
                height="35"
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

import {
    firstnameRule,
    lastnameRule,
    addressRule,
    cinRule,
    required,
    ramedNumRule,
} from "@/helpers/inputsRules";

export default {
    name: "ExternStep2",
    data: () => ({
        loading: false,
        categories: [
            "PAID",
            "POTENTIAL",
            "RAMED",
            "CNOPS",
            "MAFAR",
            "CNSS",
            "ORGANISM",
        ],
        presentations: ["LAB", "RADIO", "Consultation"],
        services: [
            "P1",
            "P2",
            "P3",
            "P4",
            "CHA",
            "CHB",
            "CHC",
            "CHD",
            "CHOP",
            "UPM",
            "UPC",
            "REAA",
            "REAB",
        ],
        firstnameRule,
        lastnameRule,
        addressRule,
        cinRule,
        required,
        ramedNumRule,
    }),
    computed: {
        ...mapGetters(["extEpisodeFrom", "getIpp"]),
    },
    methods: {
        ...mapActions([
            "changeExtStep",
            "saveEpisode",
            "clearextEpisodeFrom",
            "clearPatientData",
        ]),
        async nextStep() {
            if (!this.$refs.episode.validate()) return;
            this.loading = true;

            try {
                this.extEpisodeFrom.type = "external";
                let res = await this.saveEpisode([
                    this.extEpisodeFrom,
                    this.getIpp,
                ]);
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Enregistrement",
                    text: "Episode registred",
                });
                await this.clearextEpisodeFrom();
                await this.clearPatientData();
                await this.changeExtStep(3);
            } catch (err) {
                console.log(err);
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Submit error",
                    text: err.response.data.message,
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

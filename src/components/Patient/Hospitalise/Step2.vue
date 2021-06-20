<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4" max-width="700px">
                <v-form ref="episode" lazy-validation>
                    <div class="d-flex flex-column align-center mb-2">
                        <p class="text-center pa-0 ma-0">Type D'admission</p>
                        <v-radio-group
                            class="pa-0 mt-2"
                            v-model="hospEpisodeFrom.admType"
                            row
                            :rules="[required('Type D\'admission')]"
                        >
                            <v-radio
                                label="Urgence"
                                value="urgent"
                                color="red"
                                class="mr-5"
                            ></v-radio>
                            <v-radio
                                label="Normale"
                                value="normal"
                                color="#2ecc71"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                    <v-row no-gutters class="mt-2">
                        <v-col class="me-4">
                            <v-text-field
                                v-model="hospEpisodeFrom.firstName"
                                :rules="firstnameRule"
                                placeholder="Prenom de l'accompagnant"
                                label="Prenom de l'accompagnant"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="hospEpisodeFrom.lastName"
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
                                v-model="hospEpisodeFrom.address"
                                :rules="addressRule"
                                placeholder="Adresse de l'accompagnant"
                                label="Adresse de l'accompagnant"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="hospEpisodeFrom.cin"
                                :rules="cinRule"
                                placeholder="CIN"
                                label="CIN"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="mt-2">
                        <v-col class="me-4">
                            <v-select
                                v-model="hospEpisodeFrom.service"
                                ref="Sr"
                                :rules="[required('Service D\'hospilisation')]"
                                :items="services"
                                placeholder="Service D'hospilisation"
                                label="Service D'hospilisation"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="hospEpisodeFrom.entryDate"
                                :rules="[required('Date D\'admission')]"
                                placeholder="Date D'admission"
                                label="Date D'admission"
                                onfocus="(this.type='date')"
                                onblur="(this.type='text')"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="mt-2">
                        <v-col class="me-4">
                            <v-checkbox
                                v-model="hospEpisodeFrom.hospitalDay"
                                label="Hopital de jour"
                                color="primary"
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
                                v-model="hospEpisodeFrom.category"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        no-gutters
                        v-if="hospEpisodeFrom.category == 'RAMED'"
                    >
                        <v-col class="me-4">
                            <v-text-field
                                v-model="hospEpisodeFrom.ramedNum"
                                :rules="ramedNumRule"
                                placeholder="Numero du facture"
                                label="Numero du facture"
                                outlined
                                class="rounded-lg"
                                type="number"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-if="hospEpisodeFrom.category == 'RAMED'"
                                v-model="hospEpisodeFrom.ramedExpDate"
                                :rules="[required('Ramed expiration date')]"
                                placeholder="Ramed Expiration Date"
                                label="Ramed Expiration Date"
                                outlined
                                onfocus="(this.type='date')"
                                onblur="(this.type='text')"
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </div>
        <div class="d-flex pb-10 mx-auto" style="max-width: 650px">
            <v-btn
                elevation="0"
                text
                color="blue"
                @click="changeHospStep(1)"
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
                @click="save"
                :loading="loading"
                :disabled="loading"
            >
                Enregistrer
                <v-icon right small> mdi-content-save</v-icon>
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
    name: "HospitaliteStep2",
    data: () => ({
        loading: false,
        categories: [
            "PAID",
            "POTENTIAL",
            "RAMED",
            "CNOPS",
            "MAFAR",
            "CNSS",
            "PERSONNEL",
            "ORGANISM",
        ],
        services: [
            "P1",
            "P2",
            "P3",
            "P4",
            "p5",
            "CHA",
            "CHB",
            "CHC",
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
        ...mapGetters(["hospEpisodeFrom", "getIpp"]),
    },
    methods: {
        ...mapActions([
            "changeHospStep",
            "saveEpisode",
            "clearhospEpisodeFrom",
            "clearPatientData",
        ]),
        async save() {
            if (!this.$refs.episode.validate()) return;
            this.loading = true;
            try {
                this.hospEpisodeFrom.type = "hospitalized";
                if (!this.hospEpisodeFrom.hospitalDay)
                    this.hospEpisodeFrom.hospitalDay = false;
                let res = await this.saveEpisode([
                    this.hospEpisodeFrom,
                    this.getIpp,
                ]);
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Enregistrement",
                    text: "Episode a été enregistré",
                });
                await this.clearhospEpisodeFrom();
                await this.clearPatientData();
                await this.$router.push({ name: "Dashboard" });
            } catch (err) {
                console.log(err);
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Enregistrement error",
                    text: err.response.data.message,
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

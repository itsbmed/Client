<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4" max-width="700px">
                <v-form ref="form" lazy-validation>
                    <div class="d-flex flex-column align-center mb-2">
                        <p class="text-center pa-0 ma-0">Type D'admission</p>
                        <v-radio-group
                            class="pa-0 mt-2"
                            v-model="hospEpisodeData.admType"
                            row
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
                                v-model="hospEpisodeData.firstName"
                                placeholder="Prenom"
                                label="Prenom"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="hospEpisodeData.lastName"
                                placeholder="Nom"
                                label="Nom"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col class="me-4">
                            <v-text-field
                                v-model="hospEpisodeData.address"
                                placeholder="Adrress"
                                label="Adrress"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="hospEpisodeData.cin"
                                :rules="daRules"
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
                                v-model="hospEpisodeData.service"
                                ref="Sr"
                                :rules="srRules"
                                :items="services"
                                placeholder="Service D'hospilisation"
                                label="Service D'hospilisation"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="hospEpisodeData.entryDate"
                                :rules="daRules"
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
                            <v-select
                                :items="presentations"
                                placeholder="Nature de presentation"
                                label="Nature de presentation"
                                outlined
                                class="rounded-lg"
                                v-model="hospEpisodeData.presentationNature"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                                :items="categories"
                                placeholder="Categorie Comptables"
                                label="Categorie Comptables"
                                outlined
                                class="rounded-lg"
                                v-model="hospEpisodeData.category"
                            />
                        </v-col>
                    </v-row>
                    <v-row
                        no-gutters
                        v-if="hospEpisodeData.category == 'RAMED'"
                    >
                        <v-col class="me-4">
                            <v-text-field
                                placeholder="Numero du facture"
                                label="Numero du facture"
                                outlined
                                class="rounded-lg"
                                type="number"
                                v-model="hospEpisodeData.ramedNum"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-if="hospEpisodeData.category == 'RAMED'"
                                placeholder="Ramed Expiration Date"
                                label="Ramed Expiration Date"
                                outlined
                                onfocus="(this.type='date')"
                                onblur="(this.type='text')"
                                class="rounded-lg"
                                v-model="hospEpisodeData.ramedExpDate"
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

export default {
    name: "HospitaliteStep2",
    data: () => ({
        loading: false,
        dRules: [(v) => !!v || "La date est requis"],
        daRules: [(v) => !!v || "La date d'admission est requis"],
        sRules: [(v) => !!v || "Le service d'hospilisation est requis"],
        srRules: [(v) => !!v || "Le service d'hospilisation est requis"],
        cRules: [(v) => !!v || "la categorie comptable est requis"],
        categories: [
            "PAID",
            "POTENTIAL",
            "RAMED",
            "CNOPS",
            "MAFAR",
            "CNSS",
            "ORGANISM",
        ],
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
        presentations: ["LAB", "RADIO", "MEDICAL", "SURGICAL", "REANIMATION"],
    }),
    computed: {
        ...mapGetters(["hospEpisodeData", "getIpp"]),
    },
    methods: {
        ...mapActions([
            "changeHospStep",
            "saveEpisode",
            "clearHospEpisodeData",
            "clearPatientData",
        ]),
        async save() {
            this.loading = true;
            try {
                this.hospEpisodeData.type = "hospitalized";
                let res = await this.saveEpisode([
                    this.hospEpisodeData,
                    this.getIpp,
                ]);
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Enregistrement",
                    text: "Episode a été enregistré",
                });
                await this.clearHospEpisodeData();
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

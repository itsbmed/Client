<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4" max-width="700px">
                <v-form ref="form" lazy-validation>
                    <div class="d-flex flex-column align-center">
                        <p class="text-center pa-0 ma-0">Type D'admission</p>
                        <v-radio-group
                            class="pa-0 mt-3 mb-4"
                            v-model="extEpisodeData.admType"
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
                                v-model="extEpisodeData.firstName"
                                placeholder="Prenom"
                                label="Prenom"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="extEpisodeData.lastName"
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
                                v-model="extEpisodeData.address"
                                placeholder="Adrress"
                                label="Adrress"
                                required
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="extEpisodeData.cin"
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
                                :items="presentations"
                                placeholder="Nature de presentation"
                                label="Nature de presentation"
                                outlined
                                class="rounded-lg"
                                v-model="extEpisodeData.presentationNature"
                            />
                        </v-col>
                        <v-col>
                            <v-select
                                :items="categories"
                                placeholder="Categorie Comptables"
                                label="Categorie Comptables"
                                outlined
                                class="rounded-lg"
                                v-model="extEpisodeData.category"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-if="extEpisodeData.category == 'RAMED'">
                        <v-col class="me-4">
                            <v-text-field
                                placeholder="Numero du facture"
                                label="Numero du facture"
                                outlined
                                class="rounded-lg"
                                type="number"
                                v-model="extEpisodeData.ramedNum"
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
                                v-model="extEpisodeData.ramedExpDate"
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
        presentations: ["LAB", "RADIO", "MEDICAL", "SURGICAL", "REANIMATION"],
    }),
    computed: {
        ...mapGetters(["extEpisodeData", "getIpp"]),
    },
    methods: {
        ...mapActions([
            "changeExtStep",
            "saveEpisode",
            "clearExtEpisodeData",
            "clearPatientData",
        ]),
        async nextStep() {
            this.loading = true;

            try {
                this.extEpisodeData.type = "external";
                let res = await this.saveEpisode([
                    this.extEpisodeData,
                    this.getIpp,
                ]);
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Enregistrement",
                    text: "Episode registred",
                });
                await this.clearExtEpisodeData();
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

<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <div class="d-flex flex-column align-center">
                    <p class="text-center pa-0 ma-0">Type D'admission</p>
                    <v-radio-group
                        class="pa-0 mt-3 mb-4"
                        v-model="episodeData.admType"
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
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-model="episodeData.initDate"
                        placeholder="Date"
                        label="Date"
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="episodeData.entryDate"
                        :rules="daRules"
                        placeholder="Date D'admission"
                        label="Date D'admission"
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="episodeData.service"
                        ref="Sr"
                        :counter="10"
                        :rules="srRules"
                        placeholder="Service D'hospilisation"
                        label="Service D'hospilisation"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-text-field
                        v-model="episodeData.situation"
                        ref="st"
                        :counter="10"
                        :rules="sRules"
                        placeholder="Situation"
                        label="Situation"
                        required
                        outlined
                        single-line
                        class="rounded-lg"
                        clearable
                    />
                    <v-select
                        single-line
                        clearable
                        :items="['P,P', 'RAMED', 'MAFAR']"
                        placeholder="Type AD"
                        label="Type AD"
                        outlined
                        class="rounded-lg"
                        v-model="episodeData.category"
                    />

                    <v-text-field
                        v-model="episodeData.tName"
                        ref="Tn"
                        placeholder="Nom De Titulaire"
                        label="Nom De Titulaire"
                        clearable
                        outlined
                        single-line
                        class="rounded-lg"
                    />
                    <v-text-field
                        v-model="episodeData.tnErcure"
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
    }),
    computed: {
        ...mapGetters(["episodeData", "getIpp"]),
    },
    methods: {
        ...mapActions([
            "changeHospStep",
            "saveEpisode",
            "clearEpisodeData",
            "clearPetientData",
        ]),
        async save() {
            this.loading = true;
            try {
                this.episodeData.type = "hospitalized";
                let res = await this.saveEpisode([
                    this.episodeData,
                    this.getIpp,
                ]);

                if (res.status === 200) {
                    this.$notify({
                        group: "br",
                        type: "success",
                        title: "Enregistrement",
                        text: "Episode registred",
                    });
                    await this.clearEpisodeData();
                    await this.clearPetientData();
                    await this.$router.push({ name: "Dashboard" });
                }
            } catch ({ response: err }) {
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Enregistrement error",
                    text: err.data.message,
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

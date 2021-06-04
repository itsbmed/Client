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
                        filled
                        single-line
                        rounded
                        onfocus="(this.type='date')"
                        onblur="(this.type='text')"
                        outlined
                        class="rounded-lg"
                        placeholder="Date"
                        label="Date"
                        clearable
                    />
                    <v-select
                        v-model="episodeData.presentationNature"
                        :items="['CS/SP', 'RX']"
                        filled
                        single-line
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Nature De Presentation"
                        label="Nature De Presentation"
                        required
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
    }),
    computed: {
        ...mapGetters(["episodeData", "getIpp"]),
    },
    methods: {
        ...mapActions(["changeExtStep", "saveEpisode"]),
        async nextStep() {
            this.loading = true;
            try {
                this.episodeData.type = "external";
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
                    await this.changeExtStep(3);
                }
            } catch ({ response: err }) {
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Submit error",
                    text: err.data.message,
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

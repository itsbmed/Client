<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4" max-width="700px">
                <v-form ref="form" lazy-validation>
                    <v-text-field
                        v-if="context == 'hospFact'"
                        single-line
                        v-model="billData.exitDate"
                        rounded
                        outlined
                        class="rounded-lg"
                        placeholder="Date srt"
                        label="Date srt"
                        required
                        clearable
                        filled
                    />
                    <v-text-field
                        v-model="billData.nBill"
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
                        v-model="billData.actes"
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
                        v-model="billData.medicament"
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
                        v-model="billData.prosthesis"
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
                        v-if="context == 'hospFact'"
                        v-model="billData.category"
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
                        v-else
                        v-model="billData.nature"
                        filled
                        single-line
                        rounded
                        :rules="caRules"
                        outlined
                        class="rounded-lg"
                        placeholder="Nature"
                        label="Nature"
                        clearable
                    />

                    <v-text-field
                        v-model="billData.nReceipt"
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
                <span>
                    Totale Facture :
                    <span style="color: #2ecc71">
                        {{ total + " DH" }}
                    </span>
                </span>
            </v-card>
        </div>
        <div class="d-flex pb-2 mx-auto" style="max-width: 670px">
            <v-btn
                elevation="0"
                text
                color="blue"
                @click="changeExtStep(2)"
                class="mr-auto"
                height="45"
                v-if="!context"
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
                :class="{ 'mx-auto mt-3': context }"
                :loading="loading"
                :disabled="loading"
                @click="save"
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
    name: "ExternStep3",
    props: { context: { type: String, required: false, default: null } },
    data: () => ({
        loading: false,
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
        ...mapGetters(["billData", "getIpp", "episodeId"]),
        total() {
            return (
                (parseInt(this.billData.actes) || 0) +
                (parseInt(this.billData.medicament) || 0) +
                (parseInt(this.billData.prosthesis) || 0)
            );
        },
    },
    methods: {
        ...mapActions(["changeExtStep", "clearBillData", "saveBill"]),
        async save() {
            this.loading = true;
            try {
                this.billData.type = "hospitalized";
                this.billData.total = this.total;

                let res = await this.saveBill([this.billData, this.episodeId]);

                if (res.status === 200) {
                    this.$notify({
                        group: "br",
                        type: "success",
                        title: "Enregistrement",
                        text: "Facture a été enregistré",
                    });
                    await this.clearBillData();
                    await this.$router.push({ name: "Dashboard" });
                }
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

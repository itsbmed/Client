<template>
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
                <slot></slot>
            </span>
        </template>
        <v-card flat class="mx-auto py-4 add-facture" max-width="700px">
            <div class="pb-2">
                <v-card flat class="mx-auto px-4" max-width="700px">
                    <v-form ref="form" lazy-validation>
                        <v-row>
                            <v-col class="mr-4">
                                <v-text-field
                                    v-model="billData.nReceipt"
                                    filled
                                    single-line
                                    type="number"
                                    rounded
                                    :rules="ncRules"
                                    outlined
                                    class="rounded-lg"
                                    placeholder="N*Quitance"
                                    label="N*Quitance"
                                    clearable
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="billData.nBill"
                                    filled
                                    :rules="nfRules"
                                    single-line
                                    type="number"
                                    rounded
                                    outlined
                                    class="rounded-lg"
                                    placeholder="Num Facture"
                                    label="Num Facture"
                                    required
                                    clearable
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mr-4">
                                <v-text-field
                                    v-model="billData.actes"
                                    filled
                                    :rules="aRules"
                                    single-line
                                    type="number"
                                    rounded
                                    outlined
                                    class="rounded-lg"
                                    placeholder="Actes"
                                    label="Actes"
                                    required
                                    clearable
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="billData.medicament"
                                    filled
                                    single-line
                                    rounded
                                    type="number"
                                    outlined
                                    class="rounded-lg"
                                    placeholder="Medicam"
                                    label="Medicam"
                                    required
                                    clearable
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="mr-4">
                                <v-text-field
                                    v-model="billData.prosthesis"
                                    filled
                                    single-line
                                    rounded
                                    type="number"
                                    outlined
                                    class="rounded-lg"
                                    placeholder="Prothes"
                                    label="Prothes"
                                    required
                                    clearable
                                />
                            </v-col>
                            <v-col>
                                <v-select
                                    v-model="billData.nature"
                                    filled
                                    :items="[
                                        'HOSPIT MEDICAL',
                                        'HOSPIT CHIRUGICAL',
                                    ]"
                                    single-line
                                    rounded
                                    :rules="caRules"
                                    outlined
                                    class="rounded-lg"
                                    placeholder="Nature"
                                    label="Nature"
                                    clearable
                                />
                            </v-col>
                        </v-row>
                    </v-form>
                    <span>
                        Totale Facture :
                        <span style="color: #2ecc71">
                            {{ total + " DH" }}
                        </span>
                    </span>
                </v-card>
            </div>
            <div
                class="d-flex flex-column align-center"
                style="max-width: 670px"
            >
                <v-btn
                    elevation="4"
                    outlined
                    color="primary"
                    width="200"
                    height="45"
                    class="float-right"
                    :loading="loading"
                    :disabled="loading"
                    @click="save"
                >
                    Enregistrer
                    <v-icon right small> mdi-content-save</v-icon>
                </v-btn>
                <a
                    class="text-none blue--text underlined-on-hover mt-4"
                    text
                    @click="dialog = false"
                >
                    cancel
                </a>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
    name: "AddFacture",
    props: {
        episode: { type: Object, required: true },
    },
    data: () => ({
        loading: false,
        dialog: false,
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
        ...mapGetters(["billData", "getIpp"]),
        total() {
            return (
                (parseInt(this.billData.actes) || 0) +
                (parseInt(this.billData.medicament) || 0) +
                (parseInt(this.billData.prosthesis) || 0)
            );
        },
    },
    methods: {
        ...mapActions(["clearBillData", "saveBill"]),
        async save() {
            this.loading = true;
            try {
                this.billData.total = this.total;
                this.billData.actes = parseInt(this.billData.actes);
                this.billData.medicament = parseInt(this.billData.medicament);
                this.billData.prosthesis = parseInt(this.billData.prosthesis);

                let res = await this.saveBill([this.billData, this.episode.id]);

                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Enregistrement",
                    text: "Facture a été enregistré",
                });
                await this.clearBillData();
                this.episode.bill = true;
                this.episode.exitDate = Date.now();

                this.dialog = false;
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

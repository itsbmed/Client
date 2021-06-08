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
                        <v-row no-gutters>
                            <v-col class="me-4">
                                <v-text-field
                                    v-model="billData.billNum"
                                    placeholder="Facture number"
                                    label="Facture number"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="billData.medicalBiology"
                                    placeholder="Biologie medical"
                                    label="Biologie medical"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-2">
                            <v-col class="me-4">
                                <v-text-field
                                    v-model="billData.medicalImaging"
                                    placeholder="Medical Imaging"
                                    label="Medical Imaging"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="billData.prosthesis"
                                    placeholder="Prosthesis"
                                    label="Prosthesis"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col class="me-4">
                                <v-text-field
                                    v-model="billData.invoicedStay"
                                    placeholder="Invoice de Stay"
                                    label="Invoice de Stay"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="billData.medicalFees"
                                    placeholder="Medical Fees"
                                    label="Medical Fees"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col class="me-4">
                                <v-text-field
                                    v-model="billData.billedMedication"
                                    placeholder="Billed Medication"
                                    label="Billed Medication"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="billData.actes"
                                    placeholder="Actes"
                                    label="Actes"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col class="me-4">
                                <v-text-field
                                    v-model="billData.organismPart"
                                    placeholder="Parte Organisme"
                                    label="Parte Organisme"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>

                            <v-col>
                                <v-text-field
                                    v-model="billData.adherentPart"
                                    placeholder="Parte adherent"
                                    label="Parte adherent"
                                    outlined
                                    class="rounded-lg"
                                    type="number"
                                />
                            </v-col>
                        </v-row>
                    </v-form>
                    <v-row no-gutters>
                        <v-col>
                            Totale Facture :
                            <span style="color: #2ecc71">
                                {{ total + " DH" }}
                            </span>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
            <div
                class="d-flex flex-column align-center mt-4"
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

let excludedTotalItems = [
    "organismPart",
    "adherentPart",
    "billDate",
    "billNum",
];

export default {
    name: "AddFacture",
    props: {
        episode: { type: Object, required: true },
    },
    data: () => ({
        loading: false,
        dialog: false,
    }),
    computed: {
        ...mapGetters(["billData", "getIpp"]),
        total() {
            let some = 0;
            some += Number(this.billData.organismPart) || 0;
            some += Number(this.billData.adherentPart) || 0;
            return some;
        },
    },
    methods: {
        ...mapActions(["clearBillData", "saveBill"]),
        async save() {
            this.loading = true;
            try {
                this.billData.total = this.total;

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

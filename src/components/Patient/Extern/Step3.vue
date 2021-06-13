<template>
    <span>
        <div class="pb-2">
            <v-card flat class="mx-auto px-4 py-4" max-width="700px">
                <v-form ref="facture" lazy-validation>
                    <v-row no-gutters>
                        <v-col class="me-4">
                            <v-text-field
                                v-model="billData.billNum"
                                :rules="[required('Facture number')]"
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
                                :rules="[required('Biologie medical')]"
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
                                :rules="[required('Medical Imaging')]"
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
                                :rules="[required('Prosthesis')]"
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
                                :rules="[required('Invoice de Stay')]"
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
                                :rules="[required('Medical Fees')]"
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
                                :rules="[required('Billed Medication')]"
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
                                :rules="[required('Actes')]"
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
                                :rules="[required('Parte Organisme')]"
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
                                :rules="[required('Parte adherent')]"
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
import { required } from "@/helpers/inputsRules";

export default {
    name: "ExternStep3",
    data: () => ({
        loading: false,
        required,
    }),
    computed: {
        ...mapGetters(["billData", "getIpp", "episodeId"]),
        total() {
            let some = 0;
            some += Number(this.billData.organismPart) || 0;
            some += Number(this.billData.adherentPart) || 0;
            return some;
        },
    },
    methods: {
        ...mapActions(["changeExtStep", "clearBillData", "saveBill"]),
        async save() {
            if (!this.$refs.facture.validate()) return;
            this.loading = true;
            try {
                this.billData.total = this.total;

                let res = await this.saveBill([this.billData, this.episodeId]);

                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Enregistrement",
                    text: "Facture a été enregistré",
                });
                await this.clearBillData();
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

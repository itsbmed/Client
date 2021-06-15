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
                                v-model="billData.organismPart"
                                :rules="[required('Parte Organisme')]"
                                placeholder="Parte Organisme"
                                label="Parte Organisme"
                                outlined
                                class="rounded-lg"
                                type="number"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="justify-center">
                        <v-col cols="6" class="justify-self-center">
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
                <v-row no-gutters class="justify-center">
                    <v-col cols="6" class="text-center">
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

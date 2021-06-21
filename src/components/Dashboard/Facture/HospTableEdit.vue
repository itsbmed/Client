<template>
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
                <slot></slot>
            </span>
        </template>
        <v-card class="white edit-data">
            <v-card-text class="pt-5">
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.billNum"
                            placeholder="N° de facture"
                            label="N° de facture"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="localData.medicalBiology"
                            placeholder="Biologie Médicale"
                            label="Biologie Médicale"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.medicalImaging"
                            placeholder="Imagerie Médicale"
                            label="Imagerie Médicale"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="localData.prosthesis"
                            placeholder="Disp+Impl+Proth"
                            label="Disp+Impl+Proth"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.invoicedStay"
                            placeholder="Séjour"
                            label="Séjour"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="localData.medicalFees"
                            placeholder="Honoraires médicaux"
                            label="Honoraires médicaux"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.billedMedication"
                            placeholder="Médicament"
                            label="Médicament"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="localData.actes"
                            placeholder="Acte chirurgical"
                            label="Acte chirurgical"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.organismPart"
                            placeholder="Parte Organisme"
                            label="Parte Organisme"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>

                    <v-col>
                        <v-text-field
                            v-model="localData.adherentPart"
                            placeholder="Parte adherent"
                            label="Parte adherent"
                            outlined
                            class="rounded-lg"
                            type="number"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        Totale Facture :
                        <span style="color: #2ecc71">
                            {{
                                (localData.totale =
                                    parseInt(localData.organismPart) +
                                    parseInt(localData.adherentPart))
                            }}
                            DH
                        </span>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <h3 class="ms-2">
                    Editing
                    <span class="primary--text">
                        {{ localData.firstName }}
                        {{ localData.lastName }}'s
                    </span>
                </h3>
                <v-spacer></v-spacer>
                <a
                    class="text-none me-8 blue--text underlined-on-hover"
                    text
                    @click="dialog = false"
                >
                    cancel
                </a>
                <v-btn
                    depressed
                    color="primary"
                    width="120"
                    height="40"
                    class="text-none"
                    :disabled="loading"
                    :loading="loading"
                    @click="edit"
                >
                    <v-icon left>mdi-content-save</v-icon>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: { data: { type: Object, required: true } },
    data: (props) => ({
        dialog: false,
        loading: false,
        localData: { ...props.data },
    }),
    methods: {
        async edit() {
            this.loading = true;
            try {
                const res = await this.$axios.patch("/", this.localData);
                this.data = this.localData;
                this.dialog = false;
            } catch (err) {
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "save error",
                    text: err.data.message,
                });
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style>
.edit-data .v-card__actions {
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);
}
.edit-data .image {
    position: relative;
}
.edit-data .edit-img {
    position: absolute;
    left: 47%;
    top: 42%;
}
</style>

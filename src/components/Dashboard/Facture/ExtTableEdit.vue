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
                            placeholder="N*Facture"
                            label="N*Facture"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Nf"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Actes"
                            label="Actes"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Actes"
                        />
                    </v-col>
                </v-row>

                <v-row no-gutters class="mt-2">
                    <v-col class="me-4">
                        <v-text-field
                            placeholder="Medicame"
                            label="Medicame"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Medicame"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Prothes"
                            label="Prothes"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Prothes"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-2">
                    <v-col class="me-4">
                        <v-text-field
                            placeholder="Categorie"
                            label="Categorie"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Categorie"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="N*Quitance"
                            label="N*Quitance"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Nq"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <c-col cols="6">
                        <v-text-field
                            placeholder="Totale"
                            label="Totale"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Totale"
                        />
                    </c-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <h3 class="ms-2">
                    Editing
                    <span class="primary--text"> {{ data.Info }}'s </span> data
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

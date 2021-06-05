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
                            placeholder="Nom et Prenom"
                            label="Nom et Prenom"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.info"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Ipp"
                            label="Ipp"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Ipp"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            placeholder="Date"
                            label="Date"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Date"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Date AD"
                            label="Date AD"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Date_AD"
                        />
                    </v-col>
                </v-row>

                <v-row no-gutters> </v-row>
                <v-row no-gutters class="mt-2">
                    <v-col class="me-4">
                        <v-text-field
                            placeholder="Date Srt"
                            label="Date srt"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Date_Srt"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Service"
                            label="Service"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Service"
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
                        <v-select
                            :items="['Urgence', 'Normale']"
                            placeholder="Type AD"
                            label="Type AD"
                            outlined
                            class="rounded-lg"
                            v-model="localData.Type_Ad"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            placeholder="Tn Ercure"
                            label="Tn Ercure"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Tn_Ercure"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Tn Nom"
                            label="Tn Nom"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="localData.Tn_Nom"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <h3 class="ms-2">
                    Editing
                    <span class="primary--text"> {{ data.info }}'s </span> data
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

<template>
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
                <slot></slot>
            </span>
        </template>
        <v-card class="white edit-data">
            <v-card-text class="pt-5">
                <v-row no-gutters class="mt-2">
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.lastName"
                            :rules="lastnameRule"
                            outlined
                            class="rounded-lg mt-3"
                            placeholder="Nom de patient"
                            label="Nom de patient"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="localData.firstName"
                            :rules="firstnameRule"
                            outlined
                            class="rounded-lg mt-3"
                            placeholder="Prenom de patient"
                            label="Prenom de patient"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters class="mt-2">
                    <v-col class="me-4">
                        <v-text-field
                            v-model="localData.adress"
                            :rules="addressRule"
                            outlined
                            class="rounded-lg mt-3"
                            placeholder="Address de l'accompagnant"
                            label="Address de l'accompagnant"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="localData.cin"
                            :rules="cinRule"
                            outlined
                            class="rounded-lg mt-3"
                            placeholder="Cin"
                            label="Cin"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-select
                            v-model="localData.presentationNature"
                            :items="presentations"
                            rounded
                            outlined
                            class="rounded-lg"
                            placeholder="Nature De Presentation"
                            label="Nature De Presentation"
                        />
                    </v-col>
                    <v-col>
                        <v-select
                            v-model="localData.service"
                            placeholder="Service"
                            filled
                            label="Service"
                            :items="[
                                'P1',
                                'P2',
                                'P3',
                                'P4',
                                'p5',
                                'CHA',
                                'CHB',
                                'CHC',
                                'CHOP',
                                'UPM',
                                'UPC',
                                'REAA',
                                'REAB',
                            ]"
                            outlined
                            rounded
                            class="rounded-lg"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-select
                            :items="['URGENT', 'NORMAL']"
                            placeholder="Type AD"
                            label="Type AD"
                            outlined
                            class="rounded-lg"
                            v-model="localData.admType"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <h3 class="ms-2">
                    Editing
                    <span class="primary--text">
                        {{ localData.patient.firstName }}
                        {{ localData.patient.lastName }}'s
                    </span>
                    data
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
import {
    firstnameRule,
    lastnameRule,
    addressRule,
    cinRule,
    required,
} from "@/helpers/inputsRules";
export default {
    props: {
        data: { type: Object, required: true },
        index: { type: [String, Number], required: true },
    },

    data: (props) => ({
        dialog: false,
        loading: false,
        localData: props.data,
        presentations: ["LAB", "RADIO", "CONSULTATION"],
        firstnameRule,
        lastnameRule,
        addressRule,
        cinRule,
        required,
    }),
    methods: {
        async edit() {
            this.loading = true;
            try {
                let {
                    firstName,
                    lastName,
                    presentationNature,
                    cin,
                    adress,
                    service,
                    admType,
                    id,
                } = this.localData;
                const res = await this.$axios.put(
                    `/episodes/${id}?type=external`,
                    {
                        firstName,
                        lastName,
                        presentationNature,
                        cin,
                        adress,
                        service,
                        admType,
                    }
                );
                this.$store.dispatch("updateExtEpisode", [
                    this.localData,
                    this.index,
                ]);
                this.dialog = false;
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Saved",
                    text: "Patient data updated successfully",
                });
            } catch (err) {
                console.log(err);
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "save error",
                    text: err.response.message,
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
</style>

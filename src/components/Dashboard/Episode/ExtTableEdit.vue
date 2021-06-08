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
                            :items="['URGENT', 'NORMAL']"
                            placeholder="Type AD"
                            label="Type AD"
                            outlined
                            class="rounded-lg"
                            v-model="localData.admType"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="6">
                        <v-text-field
                            placeholder="Date"
                            label="Date"
                            onfocus="(this.type='date')"
                            onblur="(this.type='text')"
                            outlined
                            class="rounded-lg"
                            v-model="localData.createdAt"
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
export default {
    props: {
        data: { type: Object, required: true },
        index: { type: [String, Number], required: true },
    },

    data: (props) => ({
        dialog: false,
        loading: false,
        localData: { ...props.data },
        presentations: ["LAB", "RADIO", "MEDICAL", "SURGICAL", "REANIMATION"],
    }),
    methods: {
        async edit() {
            this.loading = true;
            try {
                let { presentationNature, initDate, admType, id } =
                    this.localData;
                const res = await this.$axios.put(
                    `/episodes/${id}?type=external`,
                    {
                        presentationNature,
                        initDate,
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
    mounted() {
        console.log(this.localData);
    },
};
</script>

<style>
.edit-data .v-card__actions {
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2);
}
</style>

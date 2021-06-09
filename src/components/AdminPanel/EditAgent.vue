<template>
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
                <slot></slot>
            </span>
        </template>
        <v-card class="white edit-data">
            <v-card-text class="pt-5">
                <v-form ref="editAgent" lazy-validation>
                    <v-row>
                        <v-col class="me-4">
                            <v-text-field
                                v-model="agentData.firstName"
                                :rules="firstnameRule"
                                placeholder="Prenom"
                                label="Prenom"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="agentData.lastName"
                                :rules="lastnameRule"
                                placeholder="Nom"
                                label="Nom"
                                outlined
                                class="rounded-lg"
                            />
                        </v-col>
                    </v-row>

                    <v-row no-gutters class="mt-2">
                        <v-col class="mr-4">
                            <v-text-field
                                v-model="agentData.passWord"
                                :rules="passwordRule"
                                class="rounded-lg"
                                outlined
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                label="New Password"
                                placeholder="New Password"
                                @click:append="show1 = !show1"
                            />
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="repeatPassword"
                                :rules="passwordRule"
                                class="rounded-lg"
                                outlined
                                :error="repeatPassword !== agentData.passWord"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show2 ? 'text' : 'password'"
                                label="Repeat New Password"
                                placeholder="Repeat New Password"
                                @click:append="show2 = !show2"
                            />
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col class="d-flex justify-center">
                            <v-checkbox
                                v-model="agentData.isAdmin"
                                label="Admin"
                                color="orange"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <h3 class="ms-2">
                    Editing
                    <span class="primary--text">
                        {{ agentData.firstName }}
                        {{ agentData.lastName }}'s
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
                    width="150"
                    height="40"
                    class="text-none"
                    :disabled="loading"
                    :loading="loading"
                    @click="edit"
                >
                    <v-icon left>mdi-content-save</v-icon>
                    Save changes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    firstnameRule,
    lastnameRule,
    passwordRule,
} from "@/helpers/inputsRules";
export default {
    name: "EditAgent",
    props: {
        agent: { type: Object, required: true },
    },
    data: (props) => ({
        loading: false,
        repeatPassword: "",
        show1: false,
        show2: true,
        dialog: false,
        agentData: { ...props.agent },
        firstnameRule,
        lastnameRule,
        passwordRule,
    }),
    methods: {
        async edit() {
            if (!this.$refs.editAgent.validate()) return;
            this.loading = true;
            try {
                await this.$axios.put(
                    `/agents/${this.agentData.id}`,
                    this.agentData
                );

                this.dialog = false;
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Saved",
                    text: "Agent data updated successfully",
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

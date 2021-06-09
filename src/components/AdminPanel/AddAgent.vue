<template>
    <v-container class="mt-8 px-10">
        <v-form @submit.prevent="addAgent()" ref="addAgent" lazy-validation>
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
            <v-row>
                <v-col cols="6" class="mr-4">
                    <v-text-field
                        v-model="agentData.userName"
                        :rules="usernameRule"
                        placeholder="Username"
                        label="Username"
                        outlined
                        class="rounded-lg"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col class="mr-4">
                    <v-text-field
                        v-model="agentData.passWord"
                        :rules="passwordRule"
                        class="rounded-lg"
                        outlined
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        placeholder="Password"
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
                        label="Repeat Password"
                        placeholder="Repeat Password"
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
            <v-row class="justify-center">
                <v-btn
                    depressed
                    color="primary"
                    width="160"
                    height="40"
                    class="text-none"
                    :disabled="loading"
                    :loading="loading"
                    type="submit"
                >
                    <v-icon left>mdi-content-save</v-icon>
                    Add Agent
                </v-btn>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import {
    firstnameRule,
    lastnameRule,
    usernameRule,
    passwordRule,
} from "@/helpers/inputsRules";

export default {
    name: "ProfileEdit",
    data: () => ({
        loading: false,
        agentData: {},
        repeatPassword: "",
        show1: false,
        show2: true,
        firstnameRule,
        lastnameRule,
        usernameRule,
        passwordRule,
    }),

    methods: {
        async addAgent() {
            if (!this.$refs.addAgent.validate()) return;
            this.loading = true;
            try {
                const res = await this.$axios.post("/sign-up", this.agentData);
                this.$notify({
                    group: "br",
                    type: "success",
                    title: "Agent addition",
                    text: "Agent a added successfully",
                });
                this.agentData = {};
                this.repeatPassword = undefined;
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

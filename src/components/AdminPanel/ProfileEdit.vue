<template>
    <v-container class="px-10">
        <div class="d-flex mb-8">
            <router-link
                to="/admin-panel/add-agent"
                class="rm-underline ms-auto"
            >
                <v-btn outlined class="rounded-lg text-none" color="primary">
                    <v-icon left size="20">mdi-plus</v-icon>
                    Add new agent
                </v-btn>
            </router-link>
        </div>
        <v-row no-gutters>
            <v-col class="me-4">
                <v-text-field
                    v-model="adminData.firstName"
                    :rules="firstnameRule"
                    placeholder="Prenom"
                    label="Prenom"
                    outlined
                    class="rounded-lg"
                />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="adminData.lastName"
                    :rules="lastnameRule"
                    placeholder="Nom"
                    label="Nom"
                    outlined
                    class="rounded-lg"
                />
            </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
            <v-col class="me-4">
                <v-text-field
                    v-model="adminData.currentPassword"
                    :rules="passwordRule"
                    placeholder="Current Password"
                    label="Current Password"
                    outlined
                    class="rounded-lg"
                />
            </v-col>
            <v-col>
                <v-text-field
                    v-model="adminData.passWord"
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
        </v-row>
        <v-row no-gutters class="mt-2">
            <v-col cols="6">
                <v-text-field
                    v-model="repeatPassword"
                    :rules="passwordRule"
                    class="rounded-lg"
                    outlined
                    :error="repeatPassword !== adminData.passWord"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    label="Repeat New Password"
                    placeholder="Repeat New Password"
                    @click:append="show2 = !show2"
                />
            </v-col>
        </v-row>
        <v-btn
            depressed
            color="primary"
            width="160"
            height="40"
            class="text-none"
            :disabled="loading"
            :loading="loading"
        >
            <v-icon left>mdi-content-save</v-icon>
            Save changes
        </v-btn>
    </v-container>
</template>

<script>
import {
    firstnameRule,
    lastnameRule,
    passwordRule,
} from "@/helpers/inputsRules";
export default {
    name: "ProfileEdit",
    data: () => ({
        loading: false,
        show1: false,
        show2: false,
        repeatPassword: undefined,
        firstnameRule,
        lastnameRule,
        passwordRule,
    }),
    computed: {
        adminData() {
            return this.$store.getters.getAgent;
        },
    },
};
</script>

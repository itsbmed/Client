<template>
    <v-container class="mt-8 px-10">
        <v-row>
            <v-col class="me-4">
                <v-text-field
                    placeholder="Prenom"
                    label="Prenom"
                    outlined
                    class="rounded-lg"
                    v-model="agentData.firstName"
                />
            </v-col>
            <v-col>
                <v-text-field
                    placeholder="Nom"
                    label="Nom"
                    outlined
                    class="rounded-lg"
                    v-model="agentData.lastName"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6" class="mr-4">
                <v-text-field
                    placeholder="Username"
                    label="Username"
                    outlined
                    class="rounded-lg"
                    v-model="agentData.userName"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="mr-4">
                <v-text-field
                    class="rounded-lg"
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    v-model="agentData.passWord"
                    label="Password"
                    placeholder="Password"
                    @click:append="show1 = !show1"
                />
            </v-col>
            <v-col>
                <v-text-field
                    class="rounded-lg"
                    outlined
                    :error="repeatPassword !== agentData.passWord"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    v-model="repeatPassword"
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
                @click="addAgent"
            >
                <v-icon left>mdi-content-save</v-icon>
                Add Agent
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ProfileEdit",
    data: () => ({
        loading: false,
        agentData: {},
        repeatPassword: "",
        show1: false,
        show2: true,
    }),

    methods: {
        async addAgent() {
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

<template>
    <v-card flat class="white edit-data">
        <v-card-text class="pt-5">
            <v-row no-gutters>
                <v-col class="me-4">
                    <v-text-field
                        placeholder="Prenom"
                        label="Prenom"
                        clearable
                        outlined
                        class="rounded-lg"
                        v-model="agentData.firstName"
                    />
                </v-col>
                <v-col>
                    <v-text-field
                        placeholder="Nom"
                        label="Nom"
                        clearable
                        outlined
                        class="rounded-lg"
                        v-model="agentData.lastName"
                    />
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="6" class="mr-4">
                    <v-text-field
                        placeholder="Username"
                        label="Username"
                        clearable
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
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="agentData.passWord"
                        label="Password"
                        placeholder="Password"
                        @click:append="showPassword = !showPassword"
                    />
                </v-col>
                <v-col>
                    <v-text-field
                        class="rounded-lg"
                        outlined
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="repeatPassword"
                        label="Repeat Password"
                        placeholder="Repeat Password"
                        @click:append="showPassword = !showPassword"
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
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
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
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "ProfileEdit",
    data: () => ({
        loading: false,
        agentData: {},
        showPassword: false,
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

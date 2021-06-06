<template>
    <div class="admin-panel__home">
        <v-card flat class="white">
            <div class="d-flex mb-8">
                <router-link
                    to="/admin-panel/add-agent"
                    class="rm-underline ms-auto mr-4"
                >
                    <v-btn
                        outlined
                        class="rounded-lg text-none"
                        color="primary"
                    >
                        <v-icon left size="20">mdi-plus</v-icon>
                        Add new agent
                    </v-btn>
                </router-link>
            </div>
            <v-card-text class="pt-5">
                <v-row no-gutters>
                    <v-col class="me-4">
                        <v-text-field
                            placeholder="Prenom"
                            label="Prenom"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="adminData.firstName"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            placeholder="Nom"
                            label="Nom"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="adminData.lastName"
                        />
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="6">
                        <v-text-field
                            placeholder="Username"
                            label="Username"
                            clearable
                            outlined
                            class="rounded-lg"
                            v-model="adminData.userName"
                        />
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
                >
                    <v-icon left>mdi-content-save</v-icon>
                    Save changes
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ProfileEdit",
    data: () => ({
        loading: false,
    }),
    computed: {
        adminData() {
            return this.$store.getters.getAgent;
        },
    },
};
</script>

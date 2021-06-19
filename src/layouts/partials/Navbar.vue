<template>
    <div style="z-index: 2">
        <v-app-bar flat>
            <v-btn to="/" link text class="text-none">
                <v-icon left>mdi-view-dashboard</v-icon>
                Tableau de bord
            </v-btn>

            <router-link to="/patient" class="rm-underline">
                <v-btn
                    outlined
                    class="ms-10 rounded-lg text-none"
                    color="primary"
                >
                    <v-icon color="#2ecc71" left size="22">mdi-plus</v-icon>
                    Nouveau patient
                </v-btn>
            </router-link>
            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        elevation="0"
                        text
                        rounded
                        v-bind="attrs"
                        v-on="on"
                        class="text-none"
                    >
                        <v-avatar color="primary" size="25">
                            <v-icon color="white"> mdi-account-circle </v-icon>
                        </v-avatar>
                        <span class="ms-1">{{ agent.userName }}</span>
                        <v-icon> mdi-chevron-down </v-icon>
                    </v-btn>
                </template>
                <div class="white d-flex flex-column align-start">
                    <v-btn block text class="text-none" v-if="agent.isAdmin">
                        <router-link
                            :to="{ name: 'AdminPanel' }"
                            class="rm-underline d-block black--text"
                        >
                            <v-icon left size="20">mdi-account-cog</v-icon>
                            Panneau
                        </router-link>
                    </v-btn>
                    <v-btn block text class="text-none">
                        <router-link
                            to="/admin-panel/add-agent"
                            class="rm-underline d-block black--text"
                            v-if="agent.isAdmin"
                        >
                            <v-icon left size="20">mdi-plus</v-icon>
                            Nouvel Opérateur
                        </router-link>
                    </v-btn>

                    <v-divider class="mt-10"></v-divider>
                    <v-btn
                        block
                        @click="logout"
                        text
                        color="error"
                        class="text-none"
                    >
                        <v-icon left>mdi-logout</v-icon>
                        Se déconnecter
                    </v-btn>
                </div>
            </v-menu>
        </v-app-bar>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    computed: {
        agent() {
            return this.$store.getters.getAgent;
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("logout");
        },
    },
};
</script>

<template>
    <div>
        <v-app-bar flat>
            <router-link to="/patient">
                <v-toolbar-title>Dashboard</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>
            <span>{{ agent.userName }}</span>

            <v-spacer></v-spacer>

            <v-btn text class="text-capitalize" color="error" @click="logout">
                <v-icon left>mdi-logout</v-icon>
                logout
            </v-btn>
        </v-app-bar>
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
            this.$notify({
                group: "br",
                type: "info",
                title: "Info",
                text: "You're logout!",
            });
            await this.$router.push({
                name: "Login",
            });
        },
    },
};
</script>

<style></style>

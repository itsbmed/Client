<template>
    <div class="admin-panel">
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
            color="#F5F5F5"
            height="91vh"
        >
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-avatar color="primary" size="35">
                        <v-icon color="white"> mdi-account-circle </v-icon>
                    </v-avatar>
                </v-list-item-avatar>

                <v-list-item-title>
                    {{ agent.firstName + " " + agent.lastName }}
                </v-list-item-title>

                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: true,
        items: [
            { title: "Agents", icon: "mdi-account-group" },
            { title: "Settings", icon: "mdi-cog" },
        ],
        mini: true,
    }),
    computed: {
        agent() {
            return this.$store.getters.getAgent;
        },
    },
};
</script>
<style>
.admin-panel {
    min-height: 100%;
}
</style>

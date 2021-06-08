<template>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
        color="#F5F5F5"
        height="91vh"
        absolute
        expand-on-hover
        stateless
    >
        <v-list-item exact to="/admin-panel" class="px-2">
            <v-list-item-avatar>
                <v-avatar color="primary" size="35">
                    <v-icon color="white"> mdi-account-circle </v-icon>
                </v-avatar>
            </v-list-item-avatar>

            <v-list-item-title>
                {{ agent.firstName + " " + agent.lastName }}
            </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
            <v-list-item
                exact
                :to="item.to"
                v-for="item in items"
                :key="item.title"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavigationDrawer",
    data: () => ({
        drawer: true,
        items: [
            { title: "My Account", to: "/admin-panel", icon: "mdi-account" },
            {
                title: "Agents",
                to: "/admin-panel/agents",
                icon: "mdi-account-group",
            },
            {
                title: "Analytics",
                to: "/admin-panel/analytics",
                icon: "mdi-google-analytics",
            },
            {
                title: "Add Agent",
                to: "/admin-panel/add-agent",
                icon: "mdi-plus",
            },
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

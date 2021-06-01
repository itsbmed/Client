<template>
    <v-app>
        <Navbar v-if="$store.getters.isLoggedIn" />
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>
<script>
export default {
    components: {
        Navbar: () => import("@/layouts/partials/Navbar.vue"),
    },
};
</script>

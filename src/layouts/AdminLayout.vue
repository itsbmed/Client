<template>
    <div class="admin-panel">
        <NavigationDrawer />
        <div class="ms-8 mx-auto">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminPanel",
    components: {
        NavigationDrawer: () => import("@/layouts/partials/NavigationDrawer"),
    },
};
</script>
<style>
.admin-panel {
    min-height: 100%;
}
</style>

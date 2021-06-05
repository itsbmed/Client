<template>
    <AdminLayout>
        <router-view></router-view>
    </AdminLayout>
</template>

<script>
export default {
    name: "AdminPanel",
    components: {
        AdminLayout: () => import("@/layouts/AdminLayout"),
    },
};
</script>
<style>
.admin-panel {
    min-height: 100%;
}
</style>

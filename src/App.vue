<template>
    <DefaultLayout id="app">
        <router-view />
    </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/Default";
export default {
    components: { DefaultLayout },
};
</script>

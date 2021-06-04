<template>
    <DefaultLayout id="app">
        <notifications group="br" position="bottom right" />
        <router-view />
    </DefaultLayout>
</template>
<script>
import DefaultLayout from "@/layouts/Default";
export default {
    components: { DefaultLayout },
};
</script>

<style>
.rm-underline {
    text-decoration: none !important;
}
.underlined-on-hover:hover {
    text-decoration: underline !important;
}
</style>

<template>
    <v-container fluid>
        <div
            class="d-flex justify-center mt-10"
            style="height: 15%; width: 100%"
        >
            <v-tabs
                hide-slider
                class="rounded-lg"
                background-color="#2ecc71"
                active-class="switcher"
                style="flex: none; width: auto"
                center-active
                dark
            >
                <v-tab @click="tswitch(Episode)">Episode</v-tab>
                <v-tab @click="tswitch(Facture)">Facture</v-tab>
            </v-tabs>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation class="mt-10">
            <v-container class="search-container">
                <v-text-field
                    rounded
                    single-line
                    v-model="searchbox"
                    hide-details
                    placeholder="Ipp"
                    label="Ipp"
                    v-if="estyle"
                    outlined
                    class="search-input"
                ></v-text-field>
                <v-text-field
                    rounded
                    single-line
                    v-model="searchbox"
                    v-if="fstyle"
                    hide-details
                    placeholder="Numero De Facture"
                    label="Numero De Facture"
                    outlined
                    class="search-input"
                ></v-text-field>
                <div class="search-menu">
                    <v-menu
                        offset-y
                        :close-on-content-click="false"
                        nudge-right="10"
                        left
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon size="35" v-bind="attrs" v-on="on">
                                mdi-chevron-down
                            </v-icon>
                        </template>
                        <div class="white pa-3">
                            <v-checkbox
                                v-model="selected"
                                dense
                                class="pa-0 ma-0 mb-2"
                                label="Hospitalise"
                                value="Hospitalise"
                                hide-details
                            />
                            <v-checkbox
                                v-model="selected"
                                dense
                                class="pa-0 ma-0"
                                label="Extern"
                                value="Externe"
                                hide-details
                            />
                        </div>
                    </v-menu>
                </div>
            </v-container>
        </v-form>
        <EdataTables v-if="showETable" />
        <FdataTables v-if="showFTable" />
    </v-container>
</template>

<script>
export default {
    name: "Dashboard",
    components: {
        EdataTables: () => import("../layouts/partials/EdataTables.vue"),
        FdataTables: () => import("../layouts/partials/FdataTables.vue"),
    },
    data: () => ({
        valid: true,
        sfx: "On Hospitalise",
        Episode: "Episode",
        Facture: "Facture",
        searchbox: "",
        estyle: true,
        fstyle: false,

        selected: [],
    }),
    methods: {
        tswitch(arg) {
            if (arg == this.Episode) {
                this.estyle = true;
                this.fstyle = false;
            } else if (arg == this.Facture) {
                this.fstyle = true;
                this.estyle = false;
                console.log(this.selected[0]);
            }
        },
        showETable() {
            if (this.selected.length > 0 && this.searchbox.length >= 6) {
                return true;
            } else {
                return false;
            }
        },
        showFTable() {
            if (this.selected.length > 0 && this.searchbox.length >= 6)
                return true;
            return false;
        },
    },
};
</script>

<style scoped>
.switcher {
    transition: background 0.3s, color 0.3s;
    background: white;
    color: #2ecc71 !important;
    border: 2px solid #2ecc71;
    border-radius: 10%;
}
.search-container {
    position: relative !important;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    height: 60px;
}
.search-menu {
    position: absolute !important;
    top: 18%;
    right: 20px;
}
.search-input {
    width: 100% !important;
    position: absolute !important;
    top: 0;
    left: 0;
    padding: 0 10px !important;
}
</style>

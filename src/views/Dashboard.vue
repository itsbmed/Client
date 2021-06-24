<template>
    <v-container fluid>
        <div class="d-flex justify-center mt-2">
            <v-tabs
                hide-slider
                class="rounded-lg"
                background-color="#2ecc71"
                active-class="switcher"
                style="flex: none; width: auto"
                center-active
                dark
            >
                <v-tab @click="style = 'episode'">Ipp</v-tab>
                <v-tab @click="style = 'facture'">Facture</v-tab>
            </v-tabs>
        </div>
        <v-container class="search-container mt-8">
            <v-form @submit.prevent="search">
                <v-text-field
                    rounded
                    v-model="searchbox"
                    placeholder="Ipp"
                    label="Ipp"
                    v-if="style == 'episode'"
                    outlined
                    class="search-input"
                ></v-text-field>
                <v-text-field
                    rounded
                    v-model="searchbox"
                    v-if="style == 'facture'"
                    placeholder="Numero De Facture"
                    label="Numero De Facture"
                    outlined
                    class="search-input"
                ></v-text-field>
            </v-form>
            <div class="search-menu">
                <v-menu
                    offset-y
                    :close-on-content-click="false"
                    open-on-hover
                    nudge-left="5"
                    left
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                            <v-btn icon class="me-2">
                                <v-icon size="35"> mdi-chevron-down </v-icon>
                            </v-btn>
                            <v-btn
                                depresses
                                outlined
                                type="submit"
                                color="blue"
                                class="text-none"
                                rounded
                                height="40px"
                                :disabled="searchbox.length < 6 || loading"
                                @click="search"
                                :loading="loading"
                            >
                                Rechercher
                            </v-btn>
                        </div>
                    </template>
                    <div class="white ps-5 pb-3 pt-1">
                        <v-checkbox
                            v-model="searchHosp"
                            dense
                            label="Hospitalisation"
                            hide-details
                        />

                        <v-checkbox
                            v-model="searchExt"
                            dense
                            label="Externe"
                            hide-details
                        />
                    </div>
                </v-menu>
            </div>
        </v-container>
        <div
            class="d-flex mx-auto mt-2 mb-4"
            style="max-width: 400px"
            v-if="searching"
        >
            <div class="d-flex">
                <v-checkbox
                    v-model="hosp"
                    label="Hospitalises"
                    hide-details
                    color="primary"
                    class="mr-4"
                />
                <v-checkbox
                    v-model="extern"
                    hide-details
                    label="Extern"
                    color="primary"
                />
            </div>
            <v-btn
                outlined
                color="blue"
                class="text-none ms-auto align-self-center mt-3"
                rounded
                width="100px"
                @click="clear()"
            >
                effacè
            </v-btn>
        </div>
        <div v-if="searching">
            <EpisodeHospTable v-if="style == 'episode' && hosp" />
            <EpisodeExtTable v-if="style == 'episode' && extern" />
            <FactureHospTable v-if="style == 'facture' && hosp" />
            <FactureExtTable v-if="style == 'facture' && extern" />
        </div>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";

import EpisodeExtTable from "@/components/Dashboard/Episode/ExtTable.vue";
import EpisodeHospTable from "@/components/Dashboard/Episode/HospTable.vue";

import FactureExtTable from "@/components/Dashboard/Facture/ExtTable.vue";
import FactureHospTable from "@/components/Dashboard/Facture/HospTable.vue";

export default {
    name: "Dashboard",
    components: {
        EpisodeExtTable,
        EpisodeHospTable,
        FactureExtTable,
        FactureHospTable,
    },
    data: () => ({
        searchbox: "",
        style: "episode",
        selected: [],
        searching: false,
        hosp: true,
        extern: true,
        searchHosp: true,
        searchExt: true,
        loading: false,
    }),
    methods: {
        ...mapActions([
            "getHospEpisodes",
            "getExtEpisodes",
            "clearEpisodes",
            "clearBills",
            "getHospBills",
            "getExtBills",
        ]),
        async getEpisodeData() {
            try {
                if (this.searchHosp && this.searchExt) {
                    let hospRes = await this.getHospEpisodes(this.searchbox);
                    let extRes = await this.getExtEpisodes(this.searchbox);
                    if (!hospRes.data.length && !extRes.data.length)
                        this.noDataNotif(this.searchbox);
                    else this.searching = true;
                    return;
                }
                if (this.searchHosp) {
                    let HospRes = await this.getHospEpisodes(this.searchbox);
                    if (!HospRes.data.length) this.noDataNotif(this.searchbox);
                    else this.searching = true;

                    return;
                }
                let extRes = await this.getExtEpisodes(this.searchbox);
                if (!extRes.data.length) this.noDataNotif(this.searchbox);
                else this.searching = true;
            } catch (err) {
                console.log(err);
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Get Episodes error",
                    text: err.data.message,
                });
            }
        },
        async getFactureData() {
            try {
                if (this.searchHosp && this.searchExt) {
                    let hospRes = await this.getHospBills(this.searchbox);
                    let extRes = await this.getExtBills(this.searchbox);
                    if (!hospRes.data.length && !extRes.data.length)
                        this.noDataNotif(this.searchbox);
                    else this.searching = true;
                    return;
                }
                if (this.searchHosp) {
                    let HospRes = await this.getHospBills(this.searchbox);
                    if (!HospRes.data.length) this.noDataNotif(this.searchbox);
                    else this.searching = true;

                    return;
                }
                let extRes = await this.getExtBills(this.searchbox);
                if (!extRes.data.length) this.noDataNotif(this.searchbox);
                else this.searching = true;
            } catch (err) {
                console.log(err);
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Get Bills error",
                    text: err.data.message,
                });
            }
        },
        async search() {
            if (this.searchbox.length < 6) return;
            if (!this.searchHosp && !this.searchExt) return;
            this.loading = true;
            if (!this.searchHosp) this.hosp = false;
            else this.hosp = true;
            if (!this.searchExt) this.extern = false;
            else this.extern = true;

            if (this.style == "episode") {
                await this.getEpisodeData();
            } else {
                await this.getFactureData();
            }
            this.loading = false;
        },
        noDataNotif(ipp) {
            this.$notify({
                group: "br",
                type: "error",
                text: "sorry no data found for " + ipp,
            });
        },
        clear() {
            if (this.style == "episode") this.clearEpisodes();
            if (this.style == "facture") this.clearBills();
        },
    },
};
</script>

<style>
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
    max-width: 800px !important;
    margin: 0 auto;
    height: 60px;
}

.search-input {
    width: 100% !important;
    position: absolute !important;
    top: 0;
    left: 0;
    padding: 0 10px !important;
}

.search-menu {
    position: absolute !important;
    top: 15%;
    right: 20px;
}
#data-table {
    margin-top: 10px;
}
#data-table .v-data-table__wrapper {
    max-width: 1600px;
    max-height: 500px;
}
#data-table td,
#data-table th {
    border: 1px solid #4bc58e8a;
}
#data-table tr:nth-child(even) {
    background: #f3f3f3;
}
#data-table th {
    background: #42b983;
    color: white;
}
</style>

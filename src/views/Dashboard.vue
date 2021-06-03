<template>
    <div class="flex-row" style="height: 100%; width: 100%">
        <div class="d-flex align-center" style="height: 15%; width: 100%">
            <v-btn
                large
                outlined
                class="ms-5 rounded-lg"
                style="position: absolute"
                color="#2ecc71"
            >
                New Patien
            </v-btn>
            <div class="d-flex justify-center" style="width: 100%">
                <v-tabs
                    class="rounded-lg"
                    background-color="#2ecc71"
                    active-class="switcher"
                    style="flex: none; width: auto"
                    center-active
                    dark
                >
                    <v-tabs-slider style="display: none"></v-tabs-slider>
                    <v-tab @click="tswitch(Episode)">Episode</v-tab>
                    <v-tab @click="tswitch(Facture)">Facture</v-tab>
                </v-tabs>
            </div>
        </div>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="d-flex mt-5 flex-column justify-center align-center mt-16"
        >
            <v-text-field
                rounded
                height="80px"
                v-model="searchbox"
                placeholder="Ipp"
                v-if="estyle"
                type="number"
                @change="table"
                style="width: 70%"
                outlined
            ></v-text-field>
            <v-select
                v-model="selected"
                :items="['Hospitalise', 'Externe']"
                chips
                style="position: absolute; top: 25%; right: 16%"
                deletable-chips
                chisp-color="red"
                multiple
                rounded
            ></v-select>
            <v-text-field
                height="80px"
                rounded
                v-model="searchbox"
                v-if="fstyle"
                @change="table"
                placeholder="Numero De Facture"
                type="Number"
                style="width: 70%"
                outlined
            ></v-text-field>
        </v-form>
        <edata-tables
            :selected="selected"
            v-if="estyle === true && fstyle === false && searchbox.length >= 6"
        />
        <fdata-tables v-else-if="searchbox.length >= 6" />
    </div>
</template>

<script>
import EdataTables from "../layouts/partials/EdataTables.vue";
import FdataTables from "../layouts/partials/FdataTables.vue";
export default {
    data: () => ({
        valid: true,
        sfx: "On Hospitalise",
        Episode: "Episode",
        Facture: "Facture",
        searchbox: "",
        estyle: true,
        fstyle: false,
        chose: "",
        selected: "",
    }),
    components: {
        EdataTables,
        FdataTables,
    },
    methods: {
        tswitch(arg) {
            if (arg == this.Episode) {
                this.estyle = true;
                this.fstyle = false;
            } else if (arg == this.Facture) {
                this.fstyle = true;
                this.estyle = false;
            }
            console.log(this.selected);
        },
    },
};
</script>

<style scoped>
.switcher {
    background: white;
    color: #2ecc71 !important;
    border: 2px solid #2ecc71;
    border-radius: 10%;
}
</style>

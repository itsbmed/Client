<template>
    <div class="analytics d-flex flex-column align-center">
        <Sheets class="mt-4" />
        <div class="d-flex mx-auto mb-2 mt-4" style="max-width: 300px">
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
        </div>
        <div class="date-pickers d-flex align-center py-2">
            <span class="me-2">From: </span>
            <v-text-field
                v-model="fromDate"
                rounded
                outlined
                dense
                label="From"
                placeholder="From"
                single-line
                hide-details
                type="date"
                class="me-10"
            />
            <span class="me-2">To: </span>
            <v-text-field
                v-model="toDate"
                rounded
                outlined
                dense
                label="From"
                placeholder="From"
                single-line
                hide-details
                type="date"
            />
            <v-select
                :items="items"
                placeholder="Total de"
                label="Total de"
                outlined
                rounded
                class="ms-4"
                hide-details
                single-line
                dense
                v-model="totalOf"
                style="width: 200px"
            />
            <v-select
                :items="services"
                placeholder="service"
                label="service"
                @change="clearServiceSelect()"
                outlined
                ref="serv"
                rounded
                class="ms-4"
                hide-details
                single-line
                dense
                v-model="service"
                style="width: 120px"
            />
            <v-select
                :items="['Normal', 'Urgent', 'ALL']"
                @change="clearAdmissionSelect"
                placeholder="Admition type"
                label="Admition type"
                outlined
                rounded
                class="ms-4"
                hide-details
                single-line
                dense
                v-model="admType"
                style="width: 150px"
            />
        </div>
        <div class="date-pickers d-flex align-center pt-4 pb-2">
            <v-btn
                outlined
                color="blue"
                rounded
                class="ms-8 text-none"
                width="120"
                @click="getAnalytics"
                :loading="loading"
                :disabled="loading || !fromDate || !toDate || !totalOf"
            >
                Apply
            </v-btn>
            <v-btn
                outlined
                color="orange"
                rounded
                class="ms-5 text-none"
                width="120"
                @click="reset"
                :disabled="!loaded"
            >
                Reset
            </v-btn>
        </div>
        <div class="tables ms-4">
            <HospTable v-if="hosp && loaded" class="mb-2 mt-4" />
            <ExtTable v-if="extern && loaded" class="mt-4 mb-2" />
            <TotalTable v-if="extern && hosp && loaded" />
        </div>
        <div class="hospitalise" v-if="hosp && loaded">
            <h1 class="display-1 mt-4 mb-n2">Hospitalise:</h1>
            <div class="mt-4 d-flex align-center justify-space-between">
                <div class="pie-chart mr-10">
                    <HospPieChart />
                </div>

                <div class="bar-chart" v-if="hosp && loaded">
                    <HospBarChart />
                </div>
            </div>
        </div>
        <div class="extern" v-if="extern && loaded">
            <h1 class="display-1 mt-4 mb-n2">Extern:</h1>
            <div class="mt-4 d-flex align-center justify-space-between">
                <div class="pie-chart mr-10">
                    <ExtPieChart />
                </div>

                <div class="bar-chart">
                    <ExtBarChart />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ExtPieChart from "@/components/Analytics/ExtPieChart.vue";
import HospPieChart from "@/components/Analytics/HospPieChart.vue";
import ExtBarChart from "@/components/Analytics/ExtBarChart.vue";
import HospBarChart from "@/components/Analytics/HospBarChart.vue";

import Sheets from "@/components/Analytics/Sheets.vue";
import ExtTable from "@/components/Analytics/ExtTable.vue";
import HospTable from "@/components/Analytics/HospTable.vue";
import TotalTable from "@/components/Analytics/TotalTable.vue";

import { mapActions } from "vuex";

export default {
    name: "Analyitics",
    components: {
        ExtPieChart,
        HospPieChart,
        ExtBarChart,
        HospBarChart,
        TotalTable,
        Sheets,
        ExtTable,
        HospTable,
    },
    data: () => ({
        hosp: true,
        extern: true,
        fromDate: null,
        toDate: null,
        loading: false,
        loaded: false,
        totalOf: "total",
        service: "",
        admType: "",
        items: [
            "medicalbiology",
            "medicalimaging",
            "prosthesis",
            "invoicedstay",
            "medicalfees",
            "billedmedication",
            "actes",
            "total",
        ],
        services: [
            "P1",
            "P2",
            "P3",
            "P4",
            "P5",
            "CHA",
            "CHB",
            "CHC",
            "CHOP",
            "UPM",
            "UPC",
            "REAA",
            "REAB",
            "ALL",
        ],
    }),
    methods: {
        clearServiceSelect() {
            if (this.service === "ALL") this.service = null;
        },
        clearAdmissionSelect() {
            if (this.admType === "ALL") this.admType = null;
        },
        ...mapActions([
            "getExtAnalytics",
            "getHospAnalytics",
            "clearAnalytics",
        ]),

        async reset() {
            this.fromDate = null;
            this.toDate = null;
            this.loading = false;
            this.loaded = false;
            this.totalOf = "total";
            this.service = "";
            this.admType = "";
            await this.clearAnalytics();
        },
        async getAnalytics() {
            try {
                this.loading = true;
                this.fromDate = this.fromDate.replace("/-+/g", "/");
                this.toDate = this.toDate.replace("/-+/g", "/");
                await this.clearAnalytics();
                await this.getExtAnalytics([
                    this.fromDate,
                    this.toDate,
                    this.totalOf,
                    this.service,
                    this.admType,
                ]);
                await this.getHospAnalytics([
                    this.fromDate,
                    this.toDate,
                    this.totalOf,
                    this.service,
                    this.admType,
                ]);

                this.loaded = true;
            } catch (err) {
                console.log(err);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
<style>
.analytics {
    background: #f2f2f2;
    min-height: 90vh;
    padding-bottom: 20px;
}
.pie-chart {
    width: 400px;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
}
.bar-chart {
    width: 600px;
    height: 464px;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
}
#statistics-table th {
    background: #2da36e;
    border: 1px solid #4bc58e8a;
    padding: 10px;
    color: white;
}
#statistics-table td {
    padding: 10px;
    border: 1px solid #4bc58e8a;
}
#statistics-table {
    margin-top: 10px;
}
#statistics-table .v-data-table__wrapper {
    max-width: 1250px;
    max-height: 500px;
}
</style>

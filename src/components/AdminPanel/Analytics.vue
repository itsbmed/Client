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
            <v-btn
                outlined
                color="blue"
                rounded
                class="ms-8 text-none"
                width="100"
                @click="getAnalytics"
                :loading="loading"
                :disabled="loading || !fromDate || !toDate"
            >
                Apply
            </v-btn>
        </div>
        <div class="tables ms-4">
            <HospTable v-if="hosp && loaded" class="mb-2 mt-4" />
            <ExtTable v-if="extern && loaded" class="mt-4 mb-2" />
        </div>
        <div class="mt-4 d-flex align-center justify-space-between">
            <div class="pie-chart mr-10">
                <PieChart />
            </div>

            <div class="bar-chart">
                <BarChart />
            </div>
        </div>
    </div>
</template>

<script>
import PieChart from "@/components/Analytics/PieChart.vue";
import BarChart from "@/components/Analytics/BarChart.vue";
import Sheets from "@/components/Analytics/Sheets.vue";
import ExtTable from "@/components/Analytics/ExtTable.vue";
import HospTable from "@/components/Analytics/HospTable.vue";
import { mapActions } from "vuex";

export default {
    name: "Analyitics",
    components: {
        PieChart,
        BarChart,
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
    }),
    methods: {
        ...mapActions(["getExtAnalytics", "getHospAnalytics"]),
        async getAnalytics() {
            try {
                this.fromDate = this.fromDate.replace("/-+/g", "/");
                this.toDate = this.toDate.replace("/-+/g", "/");

                let extRes = await this.getExtAnalytics([
                    this.fromDate,
                    this.toDate,
                ]);
                let hospRes = await this.getHospAnalytics([
                    this.fromDate,
                    this.toDate,
                ]);
                this.loaded = true;
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.analytics {
    background: #f2f2f2;
    min-height: 90vh;
}
.pie-chart {
    width: 400px;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
}
.bar-chart {
    width: 600px;
    height: 400px;
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

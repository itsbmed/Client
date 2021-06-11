<template>
    <div class="analytics d-flex flex-column align-center">
        <Sheets />
        <div class="charts-container d-flex align-center justify-space-between">
            <div class="pie-chart mr-10">
                <PieChart />
            </div>

            <div class="bar-chart">
                <BarChart />
            </div>
        </div>
        <ExtTable />
    </div>
</template>

<script>
import PieChart from "@/components/Analytics/PieChart.vue";
import BarChart from "@/components/Analytics/BarChart.vue";
import Sheets from "@/components/Analytics/Sheets.vue";
import ExtTable from "@/components/Analytics/ExtTable.vue";

export default {
    components: { PieChart, BarChart, Sheets, ExtTable },
    data: () => ({}),
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
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
}
th {
    background: crimson;
    padding: 10px;
}
td {
    background: rgb(31, 31, 228);
    padding: 10px;
}
</style>

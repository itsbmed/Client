<template>
    <div>
        <v-select
            :items="['Nbre', 'Montant']"
            v-model="item"
            rounded
            outlined
            dense
            single-line
            label="En fonction de"
        />
        <canvas id="extBarChart"> </canvas>
    </div>
</template>

<script>
import Chart from "chart.js/auto";
import { mapGetters } from "vuex";

import {
    backgroundColor,
    borderColor,
    borderWidth,
    labels,
    options as options1,
} from "./chartConfig";

let options = {
    ...options1,
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default {
    data: () => ({
        datasets: [{ backgroundColor, borderColor, borderWidth }],
        extBarChart: null,
        item: "Nbre",
    }),
    computed: {
        ...mapGetters(["extAmountTotals", "extEpisodeCounts"]),
    },
    methods: {
        change(val) {
            if (val === "Nbre") {
                this.datasets[0].data = this.extEpisodeCounts;
                this.extBarChart.update();
            } else {
                this.datasets[0].data = this.extAmountTotals;
                this.extBarChart.update();
            }
        },
    },
    watch: {
        item(newVal, oldVal) {
            this.change(newVal);
        },
    },
    mounted() {
        this.datasets[0].data = this.extEpisodeCounts;
        let data = { datasets: this.datasets, labels };
        let ctx = document.getElementById("extBarChart").getContext("2d");
        this.extBarChart = new Chart(ctx, {
            type: "bar",
            data,
            options,
        });
    },
};
</script>

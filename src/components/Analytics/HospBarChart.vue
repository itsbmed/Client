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
        <canvas id="hospBarChart"> </canvas>
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
        hospBarChart: null,
        item: "Nbre",
    }),
    computed: {
        ...mapGetters(["hospAmountTotals", "hospEpisodeCounts"]),
    },
    methods: {
        change(val) {
            if (val === "Nbre") {
                this.datasets[0].data = this.hospEpisodeCounts;
                this.hospBarChart.update();
            } else {
                this.datasets[0].data = this.hospAmountTotals;
                this.hospBarChart.update();
            }
        },
    },
    watch: {
        item(newVal, oldVal) {
            this.change(newVal);
        },
    },
    mounted() {
        this.datasets[0].data = this.hospEpisodeCounts;
        let data = { datasets: this.datasets, labels };
        let ctx = document.getElementById("hospBarChart").getContext("2d");
        this.hospBarChart = new Chart(ctx, {
            type: "bar",
            data,
            options,
        });
    },
};
</script>

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
        <canvas id="extPieChart"> </canvas>
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
    options,
} from "./chartConfig";

export default {
    data: () => ({
        datasets: [{ backgroundColor, borderColor, borderWidth }],
        extPieChart: null,
        item: "Nbre",
    }),
    computed: {
        ...mapGetters(["extAmountTotals", "extEpisodeCounts"]),
    },
    methods: {
        change(val) {
            if (val === "Nbre") {
                this.datasets[0].data = this.extEpisodeCounts;
                this.extPieChart.update();
            } else {
                this.datasets[0].data = this.extAmountTotals;
                this.extPieChart.update();
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
        let ctx = document.getElementById("extPieChart").getContext("2d");
        this.extPieChart = new Chart(ctx, {
            type: "pie",
            data,
            options,
        });
    },
};
</script>

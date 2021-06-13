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
        <canvas id="hospPieChart"> </canvas>
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
        hospPieChart: null,
        item: "Nbre",
    }),
    computed: {
        ...mapGetters(["hospAmountTotals", "hospEpisodeCounts"]),
    },
    methods: {
        change(val) {
            if (val === "Nbre") {
                this.datasets[0].data = this.hospEpisodeCounts;
                this.hospPieChart.update();
            } else {
                this.datasets[0].data = this.hospAmountTotals;
                this.hospPieChart.update();
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
        let ctx = document.getElementById("hospPieChart").getContext("2d");
        this.hospPieChart = new Chart(ctx, {
            type: "pie",
            data,
            options,
        });
    },
};
</script>

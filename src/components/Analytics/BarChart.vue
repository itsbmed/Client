<template>
    <canvas id="barChart"> </canvas>
</template>

<script>
import Chart from "chart.js/auto";

let labels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];

let options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export default {
    data: () => ({
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
        barChart: null,
    }),
    methods: {
        change() {
            this.datasets[0].data = [20, 4, 5, 7, 20, 3];
            this.barChart.update();
        },
    },

    mounted() {
        let data = { datasets: this.datasets, labels };
        let ctx = document.getElementById("barChart").getContext("2d");
        this.barChart = new Chart(ctx, {
            type: "bar",
            data,
            options,
        });
    },
};
</script>

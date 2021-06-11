<template>
    <div class="analytics d-flex flex-column align-center">
        <div class="sheets d-flex pt-5 pb-8">
            <v-sheet
                class="d-flex justify-center align-center me-4 white--text"
                color="green"
                elevation="4"
                rounded="lg"
                height="100"
                width="250"
            >
                Totale Petients: 200
            </v-sheet>
            <v-sheet
                class="d-flex justify-center align-center me-4 white--text"
                color="blue"
                elevation="4"
                rounded="lg"
                height="100"
                width="250"
            >
                Totale episodes: 200
            </v-sheet>

            <v-sheet
                class="d-flex justify-center align-center me-4 white--text"
                color="purple"
                elevation="4"
                rounded="lg"
                height="100"
                width="250"
            >
                Totale episodes: 200
            </v-sheet>

            <v-sheet
                class="d-flex justify-center align-center white--text"
                color="orange"
                elevation="4"
                rounded="lg"
                height="100"
                width="250"
            >
                Totale factures: 200
            </v-sheet>
        </div>
        <div class="charts-container d-flex align-center justify-space-between">
            <div class="chart1 mr-10">
                <canvas id="myChart"> </canvas>
            </div>

            <div class="chart2">
                <canvas id="myChart2"> </canvas>
            </div>
        </div>
    </div>
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
        chart: null,
        chart2: null,
    }),
    methods: {
        myChart() {
            let data = { datasets: this.datasets, labels };
            let ctx = document.getElementById("myChart").getContext("2d");
            return new Chart(ctx, {
                type: "bar",
                data,
                options,
            });
        },
        change() {
            this.datasets[0].data = [20, 4, 5, 7, 20, 3];
            console.log(this.datasets[0].data);
            this.chart.update();
        },
    },

    mounted() {
        let data = { datasets: this.datasets, labels };
        let ctx = document.getElementById("myChart").getContext("2d");
        this.chart = new Chart(ctx, {
            type: "pie",
            data,
            options,
        });
        let data2 = { datasets: this.datasets, labels };
        let ctx2 = document.getElementById("myChart2").getContext("2d");
        this.chart2 = new Chart(ctx2, {
            type: "bar",
            data: data2,
            options,
        });
    },
};
</script>
<style>
.analytics {
    background: #f2f2f2;
    min-height: 90vh;
}
.sheets {
    margin: 0 !important;
    padding: 0 !important;
}

.chart1 {
    width: 400px;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
}
.chart2 {
    width: 600px;
    height: 400px;
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 30px;
    border-radius: 10px;
}
</style>

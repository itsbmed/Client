<template>
    <div class="sheets d-flex">
        <v-sheet
            class="d-flex justify-center align-center me-4 white--text"
            color="green"
            elevation="4"
            rounded="lg"
            height="80"
            width="250"
        >
            Totale Petients: {{ counts.patientCount }}
        </v-sheet>
        <v-sheet
            class="d-flex justify-center align-center me-4 white--text"
            color="blue"
            elevation="4"
            rounded="lg"
            height="80"
            width="250"
        >
            Totale episodes: {{ counts.episodeCount }}
        </v-sheet>

        <v-sheet
            class="d-flex justify-center align-center me-4 white--text"
            color="purple"
            elevation="4"
            rounded="lg"
            height="80"
            width="250"
        >
            Totale factures: {{ counts.billCount }}
        </v-sheet>

        <v-sheet
            class="d-flex justify-center align-center white--text"
            color="orange"
            elevation="4"
            rounded="lg"
            height="80"
            width="250"
        >
            Totale agents: {{ counts.agentCount }}
        </v-sheet>
    </div>
</template>
<script>
export default {
    data: () => ({
        counts: {},
    }),
    async created() {
        let res = await this.$axios.get("/analytics/totals");
        this.counts = res.data;
    },
};
</script>

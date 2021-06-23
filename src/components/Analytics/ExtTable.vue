<template>
    <v-simple-table id="statistics-table">
        <col />
        <colgroup span="2"></colgroup>
        <colgroup span="2"></colgroup>
        <tr>
            <td rowspan="2" style="background: #f2f2f2; border: none"></td>
            <th
                colspan="2"
                scope="colgroup"
                v-for="category in categories"
                :key="category"
            >
                {{ category }}
            </th>
            <th colspan="2" scope="colgroup">Totale</th>
        </tr>
        <tr>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
            <th scope="col">Nbre</th>
            <th scope="col">Montant</th>
        </tr>
        <tr v-if="extAnalytics.paid.radio">
            <th scope="row">Examens du Radiologie</th>
            <td>{{ valNbre(0, 0) }}</td>
            <td>{{ valMontant(0, 0) }}</td>
            <td>{{ valNbre(1, 0) }}</td>
            <td>{{ valMontant(1, 0) }}</td>
            <td>{{ valNbre(2, 0) }}</td>
            <td>{{ valMontant(2, 0) }}</td>
            <td>{{ valNbre(3, 0) }}</td>
            <td>{{ valMontant(3, 0) }}</td>
            <td>{{ valNbre(4, 0) }}</td>
            <td>{{ valMontant(4, 0) }}</td>
            <td>{{ valNbre(5, 0) }}</td>
            <td>{{ valMontant(5, 0) }}</td>
            <td>{{ valNbre(6, 0) }}</td>
            <td>{{ valMontant(6, 0) }}</td>
            <td>{{ valNbre(7, 0) }}</td>
            <td>{{ valMontant(7, 0) }}</td>
            <td>{{ totalRadioNbre }}</td>
            <td>{{ totalRadioMontant }}</td>
        </tr>

        <tr v-if="extAnalytics.paid.lab">
            <th scope="row">Examens du Laboratoire</th>
            <td>{{ valNbre(0, 1) }}</td>
            <td>{{ valMontant(0, 1) }}</td>
            <td>{{ valNbre(1, 1) }}</td>
            <td>{{ valMontant(1, 1) }}</td>
            <td>{{ valNbre(2, 1) }}</td>
            <td>{{ valMontant(2, 1) }}</td>
            <td>{{ valNbre(3, 1) }}</td>
            <td>{{ valMontant(3, 1) }}</td>
            <td>{{ valNbre(4, 1) }}</td>
            <td>{{ valMontant(4, 1) }}</td>
            <td>{{ valNbre(5, 1) }}</td>
            <td>{{ valMontant(5, 1) }}</td>
            <td>{{ valNbre(6, 1) }}</td>
            <td>{{ valMontant(6, 1) }}</td>
            <td>{{ valNbre(7, 1) }}</td>
            <td>{{ valMontant(7, 1) }}</td>
            <td>{{ totalLabNbre }}</td>
            <td>{{ totalLabMontant }}</td>
        </tr>

        <tr v-if="extAnalytics.paid.consultation">
            <th scope="row">Consultation</th>
            <td>{{ valNbre(0, 2) }}</td>
            <td>{{ valMontant(0, 2) }}</td>
            <td>{{ valNbre(1, 2) }}</td>
            <td>{{ valMontant(1, 2) }}</td>
            <td>{{ valNbre(2, 2) }}</td>
            <td>{{ valMontant(2, 2) }}</td>
            <td>{{ valNbre(3, 2) }}</td>
            <td>{{ valMontant(3, 2) }}</td>
            <td>{{ valNbre(4, 2) }}</td>
            <td>{{ valMontant(4, 2) }}</td>
            <td>{{ valNbre(5, 2) }}</td>
            <td>{{ valMontant(5, 2) }}</td>
            <td>{{ valNbre(6, 2) }}</td>
            <td>{{ valMontant(6, 2) }}</td>
            <td>{{ valNbre(7, 2) }}</td>
            <td>{{ valMontant(7, 2) }}</td>
            <td>{{ totalConsNbre }}</td>
            <td>{{ totalConsMontant }}</td>
        </tr>

        <tr>
            <th scope="row">Totale</th>
            <td>
                {{ totalNbre(0) }}
            </td>
            <td>
                {{ totalMontant(0) }}
            </td>
            <td>
                {{ totalNbre(1) }}
            </td>
            <td>
                {{ totalMontant(1) }}
            </td>
            <td>
                {{ totalNbre(2) }}
            </td>
            <td>
                {{ totalMontant(2) }}
            </td>
            <td>
                {{ totalNbre(3) }}
            </td>
            <td>
                {{ totalMontant(3) }}
            </td>
            <td>
                {{ totalNbre(4) }}
            </td>
            <td>
                {{ totalMontant(4) }}
            </td>
            <td>
                {{ totalNbre(5) }}
            </td>
            <td>
                {{ totalMontant(5) }}
            </td>
            <td>
                {{ totalNbre(6) }}
            </td>
            <td>
                {{ totalMontant(6) }}
            </td>
            <td>
                {{ totalNbre(7) }}
            </td>
            <td>
                {{ totalMontant(7) }}
            </td>
            <td>{{ htotalNbre }}</td>
            <td>{{ htotalMontant }}</td>
        </tr>
    </v-simple-table>
</template>

<script>
export default {
    data: () => ({
        types: ["radio", "lab", "consultation"],
        categories: [
            "PAID",
            "POTENTIAL",
            "RAMED",
            "CNOPS",
            "MAFAR",
            "CNSS",
            "PERSONNEL",
            "ORGANISM",
        ],
    }),
    methods: {
        valNbre(i, e) {
            let val = 0;

            if (e == 0) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].radio
                        .episodeCount
                ) {
                    val =
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .radio.episodeCount;
                } else {
                    val = 0;
                }
            } else if (e == 1) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].lab
                        .episodeCount
                ) {
                    val =
                        this.extAnalytics[this.categories[i].toLowerCase()].lab
                            .episodeCount;
                } else {
                    val = 0;
                }
            } else if (e == 2) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()]
                        .consultation.episodeCount
                ) {
                    val =
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .consultation.episodeCount;
                } else {
                    val = 0;
                }
            }

            return val;
        },
        valMontant(i, e) {
            let val = 0;

            if (e == 0) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].radio
                        .amountTotal
                ) {
                    val =
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .radio.amountTotal;
                } else {
                    val = 0;
                }
            } else if (e == 1) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].lab
                        .amountTotal
                ) {
                    val =
                        this.extAnalytics[this.categories[i].toLowerCase()].lab
                            .amountTotal;
                } else {
                    val = 0;
                }
            } else if (e == 2) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()]
                        .consultation.amountTotal
                ) {
                    val =
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .consultation.amountTotal;
                } else {
                    val = 0;
                }
            }

            return val;
        },
        totalNbre(i) {
            let sum = 0;

            if (this.extAnalytics[this.categories[i].toLowerCase()]) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].radio
                        .episodeCount
                ) {
                    sum +=
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .radio.episodeCount;
                } else {
                    sum += 0;
                }
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].lab
                        .episodeCount
                ) {
                    sum +=
                        this.extAnalytics[this.categories[i].toLowerCase()].lab
                            .episodeCount;
                } else {
                    sum += 0;
                }
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()]
                        .consultation.episodeCount
                ) {
                    sum +=
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .consultation.episodeCount;
                } else {
                    sum += 0;
                }
            }

            return sum;
        },
        totalMontant(i) {
            let sum = 0;

            if (this.extAnalytics[this.categories[i].toLowerCase()]) {
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].radio
                        .amountTotal
                ) {
                    sum +=
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .radio.amountTotal;
                } else {
                    sum += 0;
                }
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()].lab
                        .amountTotal
                ) {
                    sum +=
                        this.extAnalytics[this.categories[i].toLowerCase()].lab
                            .amountTotal;
                } else {
                    sum += 0;
                }
                if (
                    this.extAnalytics[this.categories[i].toLowerCase()]
                        .consultation.amountTotal
                ) {
                    sum +=
                        this.extAnalytics[this.categories[i].toLowerCase()]
                            .consultation.amountTotal;
                } else {
                    sum += 0;
                }
            }
            return sum;
        },
    },
    computed: {
        extAnalytics() {
            return this.$store.getters.extAnalytics;
        },

        totalRadioMontant() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].radio.amountTotal;
            }
            return sum;
        },
        totalLabMontant() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].lab.amountTotal;
            }
            return sum;
        },
        totalConsMontant() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].consultation.amountTotal;
            }
            return sum;
        },
        totalRadioNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].radio.episodeCount;
            }
            return sum;
        },
        totalLabNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].lab.episodeCount;
            }
            return sum;
        },
        totalConsNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].consultation.episodeCount;
            }
            return sum;
        },
        htotalNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.episodeCount +
                    this.extAnalytics[el].radio.episodeCount +
                    this.extAnalytics[el].consultation.episodeCount;
            }
            return sum;
        },
        htotalMontant() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.amountTotal +
                    this.extAnalytics[el].radio.amountTotal +
                    this.extAnalytics[el].consultation.amountTotal;
            }
            return sum;
        },
    },
};
</script>

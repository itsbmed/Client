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
        <tr>
            <th scope="row">Hospitalisation</th>
            <td>
                {{ valNbre(0, 0) }}
            </td>

            <td>
                {{ valMontant(0, 0) }}
            </td>

            <td>
                {{ valNbre(1, 0) }}
            </td>

            <td>
                {{ valMontant(1, 0) }}
            </td>

            <td>
                {{ valNbre(2, 0) }}
            </td>

            <td>
                {{ valMontant(2, 0) }}
            </td>

            <td>
                {{ valNbre(3, 0) }}
            </td>

            <td>
                {{ valMontant(3, 0) }}
            </td>

            <td>
                {{ valNbre(4, 0) }}
            </td>

            <td>
                {{ valMontant(4, 0) }}
            </td>

            <td>
                {{ valNbre(5, 0) }}
            </td>

            <td>
                {{ valMontant(5, 0) }}
            </td>

            <td>
                {{ valNbre(6, 0) }}
            </td>

            <td>
                {{ valMontant(6, 0) }}
            </td>

            <td>
                {{ valNbre(7, 0) }}
            </td>

            <td>
                {{ valMontant(7, 0) }}
            </td>

            <td>{{ htotalNbre }}</td>

            <td>{{ htotalMontant }}</td>
        </tr>
        <tr>
            <th scope="row">Hopital de jour</th>
            <td>
                {{ valNbre(0, 1) }}
            </td>

            <td>
                {{ valMontant(0, 1) }}
            </td>

            <td>
                {{ valNbre(1, 1) }}
            </td>

            <td>
                {{ valMontant(1, 1) }}
            </td>

            <td>
                {{ valNbre(2, 1) }}
            </td>

            <td>
                {{ valMontant(2, 1) }}
            </td>

            <td>
                {{ valNbre(3, 1) }}
            </td>

            <td>
                {{ valMontant(3, 1) }}
            </td>

            <td>
                {{ valNbre(4, 1) }}
            </td>

            <td>
                {{ valMontant(4, 1) }}
            </td>

            <td>
                {{ valNbre(5, 1) }}
            </td>

            <td>
                {{ valMontant(5, 1) }}
            </td>

            <td>
                {{ valNbre(6, 1) }}
            </td>

            <td>
                {{ valMontant(6, 1) }}
            </td>

            <td>
                {{ valNbre(7, 1) }}
            </td>

            <td>
                {{ valMontant(7, 1) }}
            </td>

            <td>{{ hptotalNbre }}</td>
            <td>{{ hptotalMontant }}</td>
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
            <td>{{ htotalNbre + hptotalNbre }}</td>
            <td>{{ htotalMontant + hptotalMontant }}</td>
        </tr>
    </v-simple-table>
</template>

<script>
export default {
    data: () => ({
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
        valNbre(a, b) {
            let val = 0;

            if (
                this.hospAnalytics[this.categories[a].toLowerCase()]
                    .episodeCount &&
                b == 0
            ) {
                val =
                    this.hospAnalytics[this.categories[a].toLowerCase()]
                        .episodeCount;
            } else if (
                this.hospAnalytics.hospital[this.categories[a].toLowerCase()]
                    .episodeCount &&
                b == 1
            ) {
                val =
                    this.hospAnalytics.hospital[
                        this.categories[a].toLowerCase()
                    ].episodeCount;
            } else {
                val = 0;
            }

            return val;
        },
        valMontant(a, b) {
            let val = 0;

            if (
                this.hospAnalytics[this.categories[a].toLowerCase()]
                    .amountTotal &&
                b == 0
            ) {
                val =
                    this.hospAnalytics[this.categories[a].toLowerCase()]
                        .amountTotal;
            } else if (
                this.hospAnalytics.hospital[this.categories[a].toLowerCase()]
                    .amountTotal &&
                b == 1
            ) {
                val =
                    this.hospAnalytics.hospital[
                        this.categories[a].toLowerCase()
                    ].amountTotal;
            } else {
                val = 0;
            }

            return val;
        },
        totalNbre(i) {
            let sum = 0;

            if (
                this.hospAnalytics[this.categories[i].toLowerCase()]
                    .episodeCount
            ) {
                sum +=
                    this.hospAnalytics[this.categories[i].toLowerCase()]
                        .episodeCount +
                    this.hospAnalytics.hospital[
                        this.categories[i].toLowerCase()
                    ].episodeCount;
            } else {
                sum += 0;
            }

            return sum;
        },
        totalMontant(i) {
            let sum = 0;

            if (
                this.hospAnalytics[this.categories[i].toLowerCase()].amountTotal
            ) {
                sum +=
                    this.hospAnalytics[this.categories[i].toLowerCase()]
                        .amountTotal +
                    this.hospAnalytics.hospital[
                        this.categories[i].toLowerCase()
                    ].amountTotal;
            } else {
                sum += 0;
            }

            return sum;
        },
    },
    computed: {
        hospAnalytics() {
            return this.$store.getters.hospAnalytics;
        },

        htotalNbre(type) {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                if (el != "hospital") {
                    if (this.hospAnalytics[el].episodeCount) {
                        sum += this.hospAnalytics[el].episodeCount;
                    } else {
                        sum += 0;
                    }
                }
            }
            return sum;
        },
        htotalMontant() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                if (el != "hospital") {
                    if (this.hospAnalytics[el].amountTotal) {
                        sum += this.hospAnalytics[el].amountTotal;
                    } else {
                        sum += 0;
                    }
                }
            }
            return sum;
        },
        hptotalNbre() {
            let sum = 0;

            for (let el in this.hospAnalytics) {
                if (el != "hospital") {
                    if (this.hospAnalytics.hospital[el].episodeCount) {
                        sum += this.hospAnalytics.hospital[el].episodeCount;
                    } else {
                        sum += 0;
                    }
                }
            }

            return sum;
        },
        hptotalMontant() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                if (el != "hospital") {
                    if (this.hospAnalytics.hospital[el].amountTotal) {
                        sum += this.hospAnalytics.hospital[el].amountTotal;
                    } else {
                        sum += 0;
                    }
                }
            }
            return sum;
        },
    },
};
</script>

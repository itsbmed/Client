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
        </tr>
        <tr>
            <th scope="row">Totale</th>
            <td>
                {{
                    extAnalytics.paid.radio.episodeCount +
                    extAnalytics.paid.lab.episodeCount +
                    hospAnalytics.paid.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.paid.radio.amountTotal +
                    extAnalytics.paid.lab.amountTotal +
                    hospAnalytics.paid.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.potential.radio.episodeCount +
                    extAnalytics.potential.lab.episodeCount +
                    hospAnalytics.potential.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.potential.radio.amountTotal +
                    extAnalytics.potential.lab.amountTotal +
                    hospAnalytics.potential.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.ramed.radio.episodeCount +
                    extAnalytics.ramed.lab.episodeCount +
                    hospAnalytics.ramed.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.ramed.radio.amountTotal +
                    extAnalytics.ramed.lab.amountTotal +
                    hospAnalytics.ramed.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnops.radio.episodeCount +
                    extAnalytics.cnops.lab.episodeCount +
                    hospAnalytics.cnops.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnops.radio.amountTotal +
                    extAnalytics.cnops.lab.amountTotal +
                    hospAnalytics.cnops.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.mafar.radio.episodeCount +
                    extAnalytics.mafar.lab.episodeCount +
                    hospAnalytics.mafar.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.mafar.radio.amountTotal +
                    extAnalytics.mafar.lab.amountTotal +
                    hospAnalytics.mafar.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnss.radio.episodeCount +
                    extAnalytics.cnss.lab.episodeCount +
                    hospAnalytics.cnss.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnss.radio.amountTotal +
                    extAnalytics.cnss.lab.amountTotal +
                    hospAnalytics.cnss.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.organism.radio.episodeCount +
                    extAnalytics.organism.lab.episodeCount +
                    hospAnalytics.organism.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.organism.radio.amountTotal +
                    extAnalytics.organism.lab.amountTotal +
                    hospAnalytics.organism.amountTotal
                }}
            </td>
            <td>{{ totalHospNbre + totalExtNbre }}</td>
            <td>{{ totalHospMontant + totalExtMontant }}</td>
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
            "ORGANISM",
        ],
    }),
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
        totalLabNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum += this.extAnalytics[el].lab.episodeCount;
            }
            return sum;
        },
        totalExtNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.episodeCount +
                    this.extAnalytics[el].radio.episodeCount;
            }
            return sum;
        },
        totalExtMontant() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.amountTotal +
                    this.extAnalytics[el].radio.amountTotal;
            }
            return sum;
        },
        hospAnalytics() {
            return this.$store.getters.hospAnalytics;
        },
        totalHospNbre() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                sum +=
                    this.hospAnalytics[el].episodeCount +
                    this.hospAnalytics[el].episodeCount;
            }
            return sum;
        },
        totalHospMontant() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                sum +=
                    this.hospAnalytics[el].amountTotal +
                    this.hospAnalytics[el].amountTotal;
            }
            return sum;
        },
    },
};
</script>

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
            <th scope="row" style="width: 150px">Totale</th>
            <td>
                {{
                    extAnalytics.paid.radio.episodeCount +
                    extAnalytics.paid.lab.episodeCount +
                    extAnalytics.paid.consultation.episodeCount +
                    hospAnalytics.hospital.paid.episodeCount +
                    hospAnalytics.paid.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.paid.radio.amountTotal +
                    extAnalytics.paid.lab.amountTotal +
                    extAnalytics.paid.consultation.amountTotal +
                    hospAnalytics.hospital.paid.amountTotal +
                    hospAnalytics.paid.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.potential.radio.episodeCount +
                    extAnalytics.potential.lab.episodeCount +
                    extAnalytics.potential.consultation.episodeCount +
                    hospAnalytics.hospital.potential.episodeCount +
                    hospAnalytics.potential.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.potential.radio.amountTotal +
                    extAnalytics.potential.lab.amountTotal +
                    extAnalytics.potential.consultation.amountTotal +
                    hospAnalytics.hospital.potential.amountTotal +
                    hospAnalytics.potential.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.ramed.radio.episodeCount +
                    extAnalytics.ramed.lab.episodeCount +
                    extAnalytics.ramed.consultation.episodeCount +
                    hospAnalytics.hospital.ramed.episodeCount +
                    hospAnalytics.ramed.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.ramed.radio.amountTotal +
                    extAnalytics.ramed.lab.amountTotal +
                    extAnalytics.ramed.consultation.amountTotal +
                    hospAnalytics.hospital.ramed.amountTotal +
                    hospAnalytics.ramed.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnops.radio.episodeCount +
                    extAnalytics.cnops.lab.episodeCount +
                    extAnalytics.cnops.consultation.episodeCount +
                    hospAnalytics.hospital.cnops.episodeCount +
                    hospAnalytics.cnops.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnops.radio.amountTotal +
                    extAnalytics.cnops.lab.amountTotal +
                    extAnalytics.cnops.consultation.amountTotal +
                    hospAnalytics.hospital.cnops.amountTotal +
                    hospAnalytics.cnops.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.mafar.radio.episodeCount +
                    extAnalytics.mafar.lab.episodeCount +
                    extAnalytics.mafar.consultation.episodeCount +
                    hospAnalytics.hospital.mafar.episodeCount +
                    hospAnalytics.mafar.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.mafar.radio.amountTotal +
                    extAnalytics.mafar.lab.amountTotal +
                    extAnalytics.mafar.consultation.amountTotal +
                    hospAnalytics.hospital.mafar.amountTotal +
                    hospAnalytics.mafar.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnss.radio.episodeCount +
                    extAnalytics.cnss.lab.episodeCount +
                    extAnalytics.cnss.consultation.episodeCount +
                    hospAnalytics.hospital.cnss.episodeCount +
                    hospAnalytics.cnss.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnss.radio.amountTotal +
                    extAnalytics.cnss.lab.amountTotal +
                    extAnalytics.cnss.consultation.amountTotal +
                    hospAnalytics.hospital.cnss.amountTotal +
                    hospAnalytics.cnss.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.organism.radio.episodeCount +
                    extAnalytics.organism.lab.episodeCount +
                    extAnalytics.organism.consultation.episodeCount +
                    hospAnalytics.hospital.organism.episodeCount +
                    hospAnalytics.organism.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.organism.radio.amountTotal +
                    extAnalytics.organism.lab.amountTotal +
                    extAnalytics.organism.consultation.amountTotal +
                    hospAnalytics.hospital.organism.amountTotal +
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
        totalExtNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.episodeCount +
                    this.extAnalytics[el].radio.episodeCount +
                    this.extAnalytics[el].consultation.episodeCount;
            }
            return sum;
        },
        totalExtMontant() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.amountTotal +
                    this.extAnalytics[el].radio.amountTotal +
                    this.extAnalytics[el].consultation.amountTotal;
            }
            return sum;
        },
        hospAnalytics() {
            return this.$store.getters.hospAnalytics;
        },
        totalHospNbre() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                if (el !== "hospital")
                    sum +=
                        this.hospAnalytics[el].episodeCount +
                        this.hospAnalytics.hospital[el].episodeCount;
            }

            return sum;
        },
        totalHospMontant() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                if (el !== "hospital")
                    sum +=
                        this.hospAnalytics[el].amountTotal +
                        this.hospAnalytics.hospital[el].amountTotal;
            }
            return sum;
        },
    },
};
</script>

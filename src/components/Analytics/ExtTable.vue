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
            <td>{{ extAnalytics.paid.radio.episodeCount }}</td>
            <td>{{ extAnalytics.paid.radio.amountTotal }}</td>
            <td>{{ extAnalytics.potential.radio.episodeCount }}</td>
            <td>{{ extAnalytics.potential.radio.amountTotal }}</td>
            <td>{{ extAnalytics.ramed.radio.episodeCount }}</td>
            <td>{{ extAnalytics.ramed.radio.amountTotal }}</td>
            <td>{{ extAnalytics.cnops.radio.episodeCount }}</td>
            <td>{{ extAnalytics.cnops.radio.amountTotal }}</td>
            <td>{{ extAnalytics.mafar.radio.episodeCount }}</td>
            <td>{{ extAnalytics.mafar.radio.amountTotal }}</td>
            <td>{{ extAnalytics.cnss.radio.episodeCount }}</td>
            <td>{{ extAnalytics.cnss.radio.amountTotal }}</td>
            <td>{{ extAnalytics.personnel.radio.episodeCount }}</td>
            <td>{{ extAnalytics.personnel.radio.amountTotal }}</td>
            <td>{{ extAnalytics.organism.radio.episodeCount }}</td>
            <td>{{ extAnalytics.organism.radio.amountTotal }}</td>
            <td>{{ totalRadioNbre }}</td>
            <td>{{ totalRadioMontant }}</td>
        </tr>
        <tr v-else>
            <th scope="row">Examens du Radiologie</th>
            <td>{{ (extAnalytics.paid.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.paid.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.potential.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.potential.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.ramed.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.ramed.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.cnops.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.cnops.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.mafar.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.mafar.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.cnss.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.cnss.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.personnel.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.personnel.radio.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.organism.radio.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.organism.radio.amountTotal = 0) }}</td>
            <td>{{ (totalRadioNbre = 0) }}</td>
            <td>{{ (totalRadioMontant = 0) }}</td>
        </tr>
        <tr v-if="extAnalytics.paid.lab">
            <th scope="row">Examens du Laboratoire</th>
            <td>{{ extAnalytics.paid.lab.episodeCount }}</td>
            <td>{{ extAnalytics.paid.lab.amountTotal }}</td>
            <td>{{ extAnalytics.potential.lab.episodeCount }}</td>
            <td>{{ extAnalytics.potential.lab.amountTotal }}</td>
            <td>{{ extAnalytics.ramed.lab.episodeCount }}</td>
            <td>{{ extAnalytics.ramed.lab.amountTotal }}</td>
            <td>{{ extAnalytics.cnops.lab.episodeCount }}</td>
            <td>{{ extAnalytics.cnops.lab.amountTotal }}</td>
            <td>{{ extAnalytics.mafar.lab.episodeCount }}</td>
            <td>{{ extAnalytics.mafar.lab.amountTotal }}</td>
            <td>{{ extAnalytics.cnss.lab.episodeCount }}</td>
            <td>{{ extAnalytics.cnss.lab.amountTotal }}</td>
            <td>{{ extAnalytics.personnel.lab.episodeCount }}</td>
            <td>{{ extAnalytics.personnel.lab.amountTotal }}</td>
            <td>{{ extAnalytics.organism.lab.episodeCount }}</td>
            <td>{{ extAnalytics.organism.lab.amountTotal }}</td>
            <td>{{ totalLabNbre }}</td>
            <td>{{ totalLabMontant }}</td>
        </tr>
        <tr v-else>
            <th scope="row">Examens du Laboratoire</th>
            <td>{{ (extAnalytics.paid.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.paid.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.potential.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.potential.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.ramed.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.ramed.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.cnops.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.cnops.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.mafar.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.mafar.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.cnss.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.cnss.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.personnel.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.personnel.lab.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.organism.lab.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.organism.lab.amountTotal = 0) }}</td>
            <td>{{ (totalLabNbre = 0) }}</td>
            <td>{{ (totalLabMontant = 0) }}</td>
        </tr>

        <tr v-if="extAnalytics.paid.consultation">
            <th scope="row">Consultation</th>
            <td>{{ extAnalytics.paid.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.paid.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.potential.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.potential.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.ramed.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.ramed.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.cnops.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.cnops.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.mafar.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.mafar.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.cnss.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.cnss.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.personnel.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.personnel.consultation.amountTotal }}</td>
            <td>{{ extAnalytics.organism.consultation.episodeCount }}</td>
            <td>{{ extAnalytics.organism.consultation.amountTotal }}</td>
            <td>{{ totalConsNbre }}</td>
            <td>{{ totalConsMontant }}</td>
        </tr>
        <tr v-else>
            <th scope="row">Consultation</th>
            <td>{{ (extAnalytics.paid.consultation.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.paid.consultation.amountTotal = 0) }}</td>
            <td>
                {{ (extAnalytics.potential.consultation.episodeCount = 0) }}
            </td>
            <td>{{ (extAnalytics.potential.consultation.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.ramed.consultation.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.ramed.consultation.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.cnops.consultation.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.cnops.consultation.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.mafar.consultation.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.mafar.consultation.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.cnss.consultation.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.cnss.consultation.amountTotal = 0) }}</td>
            <td>
                {{ (extAnalytics.personnel.consultation.episodeCount = 0) }}
            </td>
            <td>{{ (extAnalytics.personnel.consultation.amountTotal = 0) }}</td>
            <td>{{ (extAnalytics.organism.consultation.episodeCount = 0) }}</td>
            <td>{{ (extAnalytics.organism.consultation.amountTotal = 0) }}</td>
            <td>{{ (totalConsNbre = 0) }}</td>
            <td>{{ (totalConsMontant = 0) }}</td>
        </tr>

        <tr>
            <th scope="row">Totale</th>
            <td>
                {{
                    extAnalytics.paid.radio.episodeCount +
                    extAnalytics.paid.consultation.episodeCount +
                    extAnalytics.paid.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.paid.radio.amountTotal +
                    extAnalytics.paid.consultation.amountTotal +
                    extAnalytics.paid.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.potential.radio.episodeCount +
                    extAnalytics.potential.consultation.episodeCount +
                    extAnalytics.potential.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.potential.radio.amountTotal +
                    extAnalytics.potential.consultation.amountTotal +
                    extAnalytics.potential.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.ramed.radio.episodeCount +
                    extAnalytics.ramed.consultation.episodeCount +
                    extAnalytics.ramed.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.ramed.radio.amountTotal +
                    extAnalytics.ramed.consultation.amountTotal +
                    extAnalytics.ramed.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnops.radio.episodeCount +
                    extAnalytics.cnops.consultation.episodeCount +
                    extAnalytics.cnops.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnops.radio.amountTotal +
                    extAnalytics.cnops.consultation.amountTotal +
                    extAnalytics.cnops.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.mafar.radio.episodeCount +
                    extAnalytics.mafar.consultation.episodeCount +
                    extAnalytics.mafar.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.mafar.radio.amountTotal +
                    extAnalytics.mafar.consultation.amountTotal +
                    extAnalytics.mafar.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnss.radio.episodeCount +
                    extAnalytics.cnss.consultation.episodeCount +
                    extAnalytics.cnss.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.cnss.radio.amountTotal +
                    extAnalytics.cnss.consultation.amountTotal +
                    extAnalytics.cnss.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.personnel.radio.episodeCount +
                    extAnalytics.personnel.consultation.episodeCount +
                    extAnalytics.personnel.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.personnel.radio.amountTotal +
                    extAnalytics.personnel.consultation.amountTotal +
                    extAnalytics.personnel.lab.amountTotal
                }}
            </td>
            <td>
                {{
                    extAnalytics.organism.radio.episodeCount +
                    extAnalytics.organism.consultation.episodeCount +
                    extAnalytics.organism.lab.episodeCount
                }}
            </td>
            <td>
                {{
                    extAnalytics.organism.radio.amountTotal +
                    extAnalytics.organism.consultation.amountTotal +
                    extAnalytics.organism.lab.amountTotal
                }}
            </td>
            <td>{{ totalNbre }}</td>
            <td>{{ totalMontant }}</td>
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
        totalNbre() {
            let sum = 0;
            for (let el in this.extAnalytics) {
                sum +=
                    this.extAnalytics[el].lab.episodeCount +
                    this.extAnalytics[el].radio.episodeCount +
                    this.extAnalytics[el].consultation.episodeCount;
            }
            return sum;
        },
        totalMontant() {
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

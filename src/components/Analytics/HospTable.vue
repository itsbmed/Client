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
            <th scope="row">Hospitalisation</th>
            <td>{{ hospAnalytics.paid.episodeCount }}</td>
            <td>{{ hospAnalytics.paid.amountTotal }}</td>
            <td>{{ hospAnalytics.potential.episodeCount }}</td>
            <td>{{ hospAnalytics.potential.amountTotal }}</td>
            <td>{{ hospAnalytics.ramed.episodeCount }}</td>
            <td>{{ hospAnalytics.ramed.amountTotal }}</td>
            <td>{{ hospAnalytics.cnops.episodeCount }}</td>
            <td>{{ hospAnalytics.cnops.amountTotal }}</td>
            <td>{{ hospAnalytics.mafar.episodeCount }}</td>
            <td>{{ hospAnalytics.mafar.amountTotal }}</td>
            <td>{{ hospAnalytics.cnss.episodeCount }}</td>
            <td>{{ hospAnalytics.cnss.amountTotal }}</td>
            <td>{{ hospAnalytics.organism.episodeCount }}</td>
            <td>{{ hospAnalytics.organism.amountTotal }}</td>
            <td>{{ totalNbre }}</td>
            <td>{{ totalMontant }}</td>
        </tr>
        <tr>
            <th scope="row">Hopital de jour</th>
            <td>{{ hospAnalytics.hospital.paid.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.paid.amountTotal }}</td>
            <td>{{ hospAnalytics.hospital.potential.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.potential.amountTotal }}</td>
            <td>{{ hospAnalytics.hospital.ramed.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.ramed.amountTotal }}</td>
            <td>{{ hospAnalytics.hospital.cnops.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.cnops.amountTotal }}</td>
            <td>{{ hospAnalytics.hospital.mafar.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.mafar.amountTotal }}</td>
            <td>{{ hospAnalytics.hospital.cnss.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.cnss.amountTotal }}</td>
            <td>{{ hospAnalytics.hospital.organism.episodeCount }}</td>
            <td>{{ hospAnalytics.hospital.organism.amountTotal }}</td>
            <td>{{ totalNbre }}</td>
            <td>{{ totalMontant }}</td>
        </tr>
        <tr>
            <th scope="row">Totale</th>
            <td>
                {{
                    hospAnalytics.paid.episodeCount +
                    hospAnalytics.hospital.paid.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.paid.amountTotal +
                    hospAnalytics.hospital.paid.amountTotal
                }}
            </td>
            <td>
                {{
                    hospAnalytics.potential.episodeCount +
                    hospAnalytics.hospital.potential.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.potential.amountTotal +
                    hospAnalytics.hospital.potential.amountTotal
                }}
            </td>
            <td>
                {{
                    hospAnalytics.ramed.episodeCount +
                    hospAnalytics.hospital.ramed.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.ramed.amountTotal +
                    hospAnalytics.hospital.ramed.amountTotal
                }}
            </td>
            <td>
                {{
                    hospAnalytics.cnops.episodeCount +
                    hospAnalytics.hospital.cnops.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.cnops.amountTotal +
                    hospAnalytics.hospital.cnops.amountTotal
                }}
            </td>
            <td>
                {{
                    hospAnalytics.mafar.episodeCount +
                    hospAnalytics.hospital.mafar.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.mafar.amountTotal +
                    hospAnalytics.hospital.mafar.amountTotal
                }}
            </td>
            <td>
                {{
                    hospAnalytics.cnss.episodeCount +
                    hospAnalytics.hospital.cnss.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.cnss.amountTotal +
                    hospAnalytics.hospital.cnss.amountTotal
                }}
            </td>
            <td>
                {{
                    hospAnalytics.organism.episodeCount +
                    hospAnalytics.hospital.organism.episodeCount
                }}
            </td>
            <td>
                {{
                    hospAnalytics.organism.amountTotal +
                    hospAnalytics.hospital.organism.amountTotal
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
            "ORGANISM",
        ],
    }),
    computed: {
        hospAnalytics() {
            return this.$store.getters.hospAnalytics;
        },
        totalNbre() {
            let sum = 0;
            for (let el in this.hospAnalytics) {
                if (el !== "hospital")
                    sum +=
                        this.hospAnalytics[el].episodeCount +
                        this.hospAnalytics.hospital[el].episodeCount;
            }

            return sum;
        },
        totalMontant() {
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

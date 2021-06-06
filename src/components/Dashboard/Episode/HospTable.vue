<template>
    <v-simple-table id="data-table" fixed-header>
        <template v-slot:default>
            <thead style="background: #2ecc71; color: white">
                <tr>
                    <th scope="col">{{ H_Head.Type }}</th>
                    <th scope="col">{{ H_Head.info }}</th>
                    <th scope="col">{{ H_Head.Ipp }}</th>
                    <th scope="col">{{ H_Head.Date }}</th>
                    <th scope="col">{{ H_Head.Date_AD }}</th>
                    <th scope="col">{{ H_Head.Date_Srt }}</th>
                    <th scope="col">{{ H_Head.Service }}</th>
                    <th scope="col">{{ H_Head.Categorie }}</th>
                    <th scope="col">{{ H_Head.Type_Ad }}</th>
                    <th scope="col">{{ H_Head.Tn_Ercure }}</th>
                    <th scope="col">{{ H_Head.Tn_Nom }}</th>
                    <th scope="col">Facturation</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hospEpisode in hospEpisodes" :key="hospEpisode.name">
                    <td>{{ hospEpisode.type }}</td>
                    <td>
                        {{ hospEpisode.patient.firstName }}
                        {{ hospEpisode.patient.lastName }}
                    </td>
                    <td>{{ hospEpisode.patient.ipp }}</td>
                    <td>{{ hospEpisode.initDate.slice(0, 10) }}</td>
                    <td>{{ hospEpisode.entryDate.slice(0, 10) }}</td>
                    <td>{{ hospEpisode.exitDate }}</td>
                    <td>{{ hospEpisode.service }}</td>
                    <td>{{ hospEpisode.category }}</td>
                    <td>{{ hospEpisode.admType }}</td>
                    <td>{{ hospEpisode.tnErcure }}</td>
                    <td>{{ hospEpisode.tName }}</td>
                    <td>
                        <AddFacture>
                            <v-icon color="primary" size="25">
                                mdi-plus
                            </v-icon>
                        </AddFacture>
                    </td>
                    <td>
                        <HospTableEdit :data="hospEpisode">
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </HospTableEdit>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "HospTable",
    components: {
        HospTableEdit: () => import("./HospTableEdit"),
        AddFacture: () => import("./AddFacture"),
    },
    computed: {
        ...mapGetters(["hospEpisodes"]),
    },
    data: () => ({
        H_Head: {
            Type: "Type",
            info: "Nom et prenom",
            Ipp: "Ipp",
            Date: "Date",
            Date_AD: "Date_AD",
            Date_Srt: "Date_Srt",
            Service: "Service",
            Categorie: "Categorie",
            Type_Ad: "Type_Ad",
            Tn_Ercure: "Tn_Ercure",
            Tn_Nom: "Tn_Nom",
        },
    }),
};
</script>

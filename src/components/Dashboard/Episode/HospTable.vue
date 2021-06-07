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
                <tr v-for="hospEpisode in hospEpisodes" :key="hospEpisode.id">
                    <td>{{ hospEpisode.type }}</td>
                    <td>
                        {{ hospEpisode.patient.firstName }}
                        {{ hospEpisode.patient.lastName }}
                    </td>
                    <td>{{ hospEpisode.patient.ipp }}</td>
                    <td>{{ formatDate(hospEpisode.initDate) }}</td>
                    <td>{{ formatDate(hospEpisode.entryDate) }}</td>
                    <td>{{ formatDate(hospEpisode.exitDate) }}</td>
                    <td>{{ hospEpisode.service }}</td>
                    <td>{{ hospEpisode.category }}</td>
                    <td>{{ hospEpisode.admType }}</td>
                    <td>{{ hospEpisode.tnErcure }}</td>
                    <td>{{ hospEpisode.tName }}</td>
                    <td class="text-center">
                        <span v-if="!hospEpisode.bill">
                            <AddFacture :episode="hospEpisode">
                                <v-icon color="primary" size="25">
                                    mdi-plus
                                </v-icon>
                            </AddFacture>
                        </span>
                        <span v-else class="primary--text">Added</span>
                    </td>
                    <td class="text-center">
                        <HospTableEdit :data="hospEpisode">
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </HospTableEdit>
                    </td>
                </tr>
                <tr class="white" v-if="moreData && hospEpisodes.length >= 10">
                    <td colspan="13" class="text-center">
                        <v-btn
                            class="text-none"
                            @click="loadMore()"
                            outlined
                            color="blue"
                            :loading="loading"
                            :disabled="loading"
                        >
                            Load more
                        </v-btn>
                    </td>
                </tr>
                <tr class="white" v-if="!hospEpisodes.length">
                    <td colspan="13" class="text-center">
                        No data found for this Ipp
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
    name: "HospTable",
    components: {
        HospTableEdit: () => import("./HospTableEdit"),
        AddFacture: () => import("./AddFacture"),
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
        loading: false,
        page: 2,
        moreData: true,
    }),
    computed: {
        ...mapGetters(["hospEpisodes"]),
    },
    methods: {
        ...mapActions(["pushHospEpisodes"]),
        async loadMore() {
            this.loading = true;
            let ipp = this.hospEpisodes[0].patient.ipp;
            let res = await this.pushHospEpisodes([ipp, this.page]);
            if (res.data.length < 10) this.moreData = false;
            this.loading = false;
            this.page++;
        },
        formatDate(date) {
            if (date) return date.toString().slice(0, 10);
            else return null;
        },
    },
};
</script>

<template>
    <v-simple-table id="data-table" fixed-header>
        <template v-slot:default>
            <thead style="background: #2ecc71; color: white">
                <tr>
                    <th v-for="(item, i) in headItems" :key="i" scope="col">
                        {{ item }}
                    </th>
                    <th scope="col">Facturation</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(hospEpisode, i) in hospEpisodes"
                    :key="hospEpisode.id"
                >
                    <td v-if="hospEpisode.hospitalDay == false">
                        {{ hospEpisode.type }}
                    </td>
                    <td v-else>{{ "Hopitale De Jour" }}</td>
                    <td>
                        {{ hospEpisode.patient.firstName }}
                        {{ hospEpisode.patient.lastName }}
                    </td>
                    <td>{{ hospEpisode.address }}</td>
                    <td>{{ hospEpisode.patient.ipp }}</td>
                    <td>{{ formatDate(hospEpisode.createdAt) }}</td>
                    <td>{{ formatDate(hospEpisode.entryDate) }}</td>
                    <td>{{ formatDate(hospEpisode.exitDate) }}</td>
                    <td>{{ hospEpisode.admType }}</td>
                    <td>{{ hospEpisode.cin }}</td>
                    <td>{{ hospEpisode.service }}</td>
                    <td>{{ hospEpisode.category }}</td>

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
                        <HospTableEdit :data="hospEpisode" :index="i">
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </HospTableEdit>
                    </td>
                </tr>
                <tr class="white" v-if="moreData && hospEpisodes.length >= 10">
                    <td colspan="16" class="text-center">
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
                    <td colspan="16" class="text-center">No data found</td>
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
        headItems: [
            "Type",
            "Nom/Prénom du patient",
            "Address de l'accompagnant",
            "Ipp",
            "Date",
            "Date Ad",
            "Date Srt",
            "Type Ad",
            "Cin",
            "Service",
            "Category",
        ],
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

<template>
    <v-simple-table fixed-header id="data-table">
        <template v-slot:default>
            <thead style="background: #2ecc71; color: white">
                <tr>
                    <th v-for="(head, i) in heads" :key="i" scope="col">
                        {{ head }}
                    </th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="bill in hospBills" :key="bill.id">
                    <td>{{ bill.episode.type }}</td>
                    <td>
                        {{ bill.episode.firstName }}
                        {{ bill.episode.lastName }}
                    </td>
                    <td>{{ bill.episode.patientId }}</td>
                    <td>{{ bill.billNum }}</td>
                    <td>{{ formatDate(bill.createdAt) }}</td>
                    <td>{{ bill.organismPart + " DH" }}</td>
                    <td>{{ bill.adherentPart + " DH" }}</td>
                    <td>{{ bill.episode.category }}</td>
                    <td>{{ bill.episode.presentationNature }}</td>
                    <td>{{ bill.total + " DH" }}</td>
                    <td>
                        <HospTableEdit :data="bill">
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </HospTableEdit>
                    </td>
                </tr>
                <tr class="white" v-if="moreData && hospBills.length >= 10">
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
                <tr class="white" v-if="!hospBills.length">
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
    name: "HospTables",
    components: {
        HospTableEdit: () => import("./HospTableEdit"),
    },
    data: () => ({
        heads: [
            "Type",
            "Nom et prenom",
            "Ipp",
            "Num Facture",
            "Facture date",
            "Part Organisme",
            "Part Adherent",
            "Categorie",
            "Type de prestations",
            "Totale",
        ],
        moreData: true,
        page: 2,
        loading: false,
    }),
    computed: {
        ...mapGetters(["hospBills"]),
    },
    methods: {
        ...mapActions(["pushHospBills"]),
        async loadMore() {
            this.loading = true;
            let ipp = this.hospBills[0].episode.patientId;
            let res = await this.pushHospBills([ipp, this.page]);
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

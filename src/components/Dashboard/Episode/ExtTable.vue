<template>
    <v-simple-table fixed-header id="data-table">
        <template v-slot:default>
            <thead>
                <tr>
                    <th scope="col">{{ Ex_Head.Type }}</th>
                    <th scope="col">{{ Ex_Head.info }}</th>
                    <th scope="col">{{ Ex_Head.Ipp }}</th>
                    <th scope="col">{{ Ex_Head.Date }}</th>
                    <th scope="col">{{ Ex_Head.Nature }}</th>
                    <th scope="col">{{ Ex_Head.Type_Ad }}</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="extEpisode in extEpisodes" :key="extEpisode.name">
                    <td>{{ extEpisode.type }}</td>
                    <td>
                        {{ extEpisode.patient.firstName }}
                        {{ extEpisode.patient.lastName }}
                    </td>
                    <td>{{ extEpisode.patient.ipp }}</td>
                    <td>{{ formatDate(extEpisode.initDate) }}</td>
                    <td>{{ extEpisode.presentationNature }}</td>
                    <td>{{ extEpisode.admType }}</td>
                    <td class="text-center">
                        <ExtTableEdit :data="extEpisode">
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </ExtTableEdit>
                    </td>
                </tr>
                <tr class="white" v-if="moreData && extEpisodes.length >= 10">
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
                <tr class="white" v-if="!extEpisodes.length">
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
    name: "ExtTable",
    components: {
        ExtTableEdit: () => import("./ExtTableEdit"),
    },
    computed: {
        ...mapGetters(["extEpisodes"]),
    },
    data: () => ({
        Ex_Head: {
            Type: "Type",
            info: "Nom et prenom",
            Ipp: "Ipp",
            Date: "Date",
            Type_Ad: "Type_Ad",
            Nature: "Nature De Presentation",
        },
        loading: false,
        page: 2,
        moreData: true,
    }),
    methods: {
        ...mapActions(["pushExtEpisodes"]),
        async loadMore() {
            this.loading = true;
            let ipp = this.extEpisodes[0].patient.ipp;
            let res = await this.pushExtEpisodes([ipp, this.page]);
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

<template>
    <v-simple-table fixed-header id="data-table">
        <template v-slot:default>
            <thead>
                <tr>
                    <th v-for="(item, i) in headItems" :key="i" scope="col">
                        {{ item }}
                    </th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(extEpisode, i) in extEpisodes" :key="extEpisode.id">
                    <td>{{ extEpisode.type }}</td>
                    <td>
                        {{ extEpisode.patient.firstName }}
                        {{ extEpisode.patient.lastName }}
                    </td>
                    <td>{{ extEpisode.address }}</td>
                    <td>{{ extEpisode.patient.ipp }}</td>
                    <td>{{ formatDate(extEpisode.createdAt) }}</td>
                    <td>{{ extEpisode.admType }}</td>
                    <td>{{ extEpisode.cin }}</td>
                    <td>{{ extEpisode.presentationNature }}</td>
                    <td>{{ extEpisode.service }}</td>
                    <td>{{ extEpisode.category }}</td>

                    <td class="text-center">
                        <ExtTableEdit :data="extEpisode" :index="i">
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
                    <td colspan="13" class="text-center">No data found</td>
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
        headItems: [
            "Type",
            "Nom/Prénom du patient",
            "Address de l'accompagnant",
            "Ipp",
            "Date",
            "Type Ad",
            "Cin",
            "Nature De Presentation",
            "service",
            "Category",
        ],
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

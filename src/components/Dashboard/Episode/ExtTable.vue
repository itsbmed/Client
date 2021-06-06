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
                    <td>{{ extEpisode.initDate.slice(0, 10) }}</td>
                    <td>{{ extEpisode.presentationNature }}</td>
                    <td>{{ extEpisode.admType }}</td>
                    <td>
                        <ExtTableEdit :data="extEpisode">
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </ExtTableEdit>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>
<script>
import { mapGetters } from "vuex";

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
    }),
};
</script>

<template>
    <v-simple-table fixed-header height="400px" id="data-table">
        <template v-slot:default>
            <thead style="background: #2ecc71; color: white">
                <tr>
                    <th scope="col">{{ Head.Type }}</th>
                    <th scope="col">{{ Head.Info }}</th>
                    <th scope="col">{{ Head.Ipp }}</th>
                    <th scope="col">{{ Head.Nf }}</th>
                    <th scope="col">{{ Head.Actes }}</th>
                    <th scope="col">{{ Head.Medicame }}</th>
                    <th scope="col">{{ Head.Prothes }}</th>
                    <th scope="col">{{ Head.Categorie }}</th>
                    <th scope="col">{{ Head.Nq }}</th>
                    <th scope="col">{{ Head.Totale }}</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in allData" :key="data.name">
                    <th scope="row">{{ data.Type }}</th>
                    <td>{{ data.Info }}</td>
                    <td>{{ data.Ipp }}</td>
                    <td>{{ data.Nf }}</td>
                    <td>{{ data.Actes + " DH" }}</td>
                    <td>{{ data.Medicame + " DH" }}</td>
                    <td>{{ data.Prothes + " DH" }}</td>
                    <td>{{ data.Categorie }}</td>
                    <td>{{ data.Nq }}</td>
                    <td>{{ data.Totale + " DH" }}</td>
                    <td>
                        <HospTableEdit :data="data">
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
export default {
    name: "HospTables",
    components: {
        HospTableEdit: () => import("./HospTableEdit"),
    },
    data: () => ({
        Head: {
            Type: "Type",
            Info: "Info",
            Ipp: "Ipp",
            Nf: "N*Facture",
            Actes: "Actes",
            Medicame: "Medicam",
            Prothes: "Prothes",
            Categorie: "Categorie",
            Nature: "Nature",
            Nq: "N*Quitance",
            Totale: "Totale",
        },
        allData: [],
    }),
};
</script>

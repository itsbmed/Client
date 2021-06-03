<template>
    <div style="padding: 2%">
        <v-simple-table fixed-header height="400px">
            <template v-slot:default>
                <thead style="background: #2ecc71; color: white">
                    <tr>
                        <th scope="col">{{ Head.Nf }}</th>
                        <th scope="col">{{ Head.Medicam }}</th>
                        <th scope="col">{{ Head.Prothes }}</th>
                        <th scope="col" v-if="check == Episode">
                            {{ Head.Categorie }}
                        </th>
                        <th scope="col" v-else>{{ Head.Nature }}</th>
                        <th scope="col" v-if="Head.Date_AD">{{ Head.Nq }}</th>
                        <th scope="col" v-if="Head.Date_Srt">
                            {{ Head.Totale }}
                        </th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <th scope="row">{{ data.Type }}</th>
                        <td>{{ data.Nf }}</td>
                        <td>{{ data.Medicam }}</td>
                        <td>{{ data.Prothes }}</td>
                        <td>{{ data.Categorie }}</td>
                        <td>{{ data.Nature }}</td>
                        <td>{{ data.Nq }}</td>
                        <td>{{ data.Totale }}</td>
                        <td>
                            <Button><i class="fas fa-edit"></i></Button>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table v-if="true == false" fixed-header height="400px">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th scope="col" v-if="check == Episode">
                            {{ Head.Type }}
                        </th>
                        <th scope="col">{{ Head.Type }}</th>
                        <th scope="col">{{ Head.info }}</th>
                        <th scope="col">{{ Head.Ipp }}</th>
                        <th scope="col">{{ Head.Date }}</th>
                        <th scope="col" v-if="Head.Nature">
                            {{ Head.Nature }}
                        </th>
                        <th scope="col" v-if="Head.Type_Ad">
                            {{ Head.Type_Ad }}
                        </th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in allData" :key="data.name">
                        <th scope="row">{{ data.Type }}</th>
                        <td>{{ data.info }}</td>
                        <td>{{ data.Ipp }}</td>
                        <td>{{ data.date }}</td>
                        <td>{{ data.Type_Ad }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>
export default {
    name: "FdataTables",
    data: () => ({
        Head: {
            Nf: "N*Facture",
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

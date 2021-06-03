<template>
    <div style="padding: 2%">
        <v-simple-table fixed-header height="400px">
            <template v-slot:default>
                <thead style="background: #2ecc71; color: white">
                    <tr>
                        <th scope="col" v-if="check == Episode">
                            {{ Head.Type }}
                        </th>
                        <th scope="col" v-else>{{ Head.Type }}</th>
                        <th scope="col">{{ Head.info }}</th>
                        <th scope="col">{{ Head.Ipp }}</th>
                        <th scope="col">{{ Head.Date }}</th>
                        <th scope="col">{{ Head.Nature }}</th>
                        <th scope="col">{{ Head.Date_AD }}</th>
                        <th scope="col">{{ Head.Date_Srt }}</th>
                        <th scope="col">{{ Head.Service }}</th>
                        <th scope="col">{{ Head.Categorie }}</th>
                        <th scope="col">{{ Head.Type_Ad }}</th>
                        <th scope="col">{{ Head.Tn_Ercure }}</th>
                        <th scope="col">{{ Head.Tn_Nom }}</th>
                        <th scope="col">Facturation</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="data in desserts" :key="data.name">
                        <th scope="row">{{ data.Type }}</th>
                        <td>{{ data.info }}</td>
                        <td>{{ data.Ipp }}</td>
                        <td>{{ data.date }}</td>
                        <td>{{ data.Date_AD }}</td>
                        <td>{{ data.Date_Srt }}</td>
                        <td>{{ data.Service }}</td>
                        <td>{{ data.Categorie }}</td>
                        <td>{{ data.Type_Ad }}</td>
                        <td>{{ data.Tn_Ecure }}</td>
                        <td>{{ data.Tn_nom }}</td>
                        <td style="color: red">Pas Facture</td>
                        <td>
                            <Button><i class="fas fa-edit"></i></Button>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table
            v-if="selected == 'Externe' || selected[1] == 'Externe'"
            fixed-header
            height="400px"
        >
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
                    <tr v-for="data in desserts" :key="data.name">
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
    name: "DataTables",
    data: () => ({
        Head: {
            Type: "Type",
            Nature: "",
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
        allData: [],
    }),
};
</script>

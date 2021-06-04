<template>
    <div style="padding: 2%">
        <v-simple-table
            fixed-header
            height="400px"
            v-if="selected[0] == 'Hospitalise' || selected.length == 2"
        >
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
                            <FtableEdit :data="data">
                                <v-icon color="blue" size="25">
                                    mdi-square-edit-outline
                                </v-icon>
                            </FtableEdit>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table
            fixed-header
            height="400px"
            v-if="selected[0] == 'Externe' || selected.length == 2"
        >
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
                        <th scope="col">{{ Head.Nature }}</th>
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
                        <td>{{ data.Nature }}</td>
                        <td>{{ data.Nq }}</td>
                        <td>{{ data.Totale + " DH" }}</td>
                        <td>
                            <EtableEdit :data="data">
                                <v-icon color="blue" size="25">
                                    mdi-square-edit-outline
                                </v-icon>
                            </EtableEdit>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>
<script>
export default {
    name: "FdataTables",
    components: {
        FtableEdit: () => import("./FtableEdit"),
        EtableEdit: () => import("./EtableEdit"),
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
        allData: [
            {
                Type: "jcb",
                Info: "Crista Blodg",
                Ipp: "5",
                Nf: "57",
                Actes: "20008",
                Medicame: "764",
                Prothes: "3321",
                Categorie: "Doors, Frames & Hardware",
                Nature: "Milvago chimachima",
                Nq: "32693",
                Totale: "49",
            },
            {
                Type: "jcb",
                Info: "Bryon Hardison",
                Ipp: "597",
                Nf: "9737",
                Actes: "705",
                Medicame: "26",
                Prothes: "0312",
                Categorie: "Sitework & Site Utilities",
                Nature: "Uraeginthus bengalus",
                Nq: "2147",
                Totale: "6",
            },
            {
                Type: "jcb",
                Info: "Emiline Cradduck",
                Ipp: "8",
                Nf: "378",
                Actes: "337",
                Medicame: "41",
                Prothes: "3",
                Categorie: "Electrical",
                Nature: "Vanellus armatus",
                Nq: "3",
                Totale: "3333",
            },
            {
                Type: "mastercard",
                Info: "Rochelle Filchakov",
                Ipp: "37",
                Nf: "3",
                Actes: "15",
                Medicame: "2",
                Prothes: "5760",
                Categorie: "Prefabricated Aluminum Metal Canopies",
                Nature: "Dendrocitta vagabunda",
                Nq: "9815",
                Totale: "51",
            },
            {
                Type: "diners-club-carte-blanche",
                Info: "Tony Hudless",
                Ipp: "970",
                Nf: "560",
                Actes: "74",
                Medicame: "786",
                Prothes: "122",
                Categorie: "Termite Control",
                Nature: "Sciurus niger",
                Nq: "91229",
                Totale: "9",
            },
            {
                Type: "instapayment",
                Info: "Arnold Biggam",
                Ipp: "9",
                Nf: "2",
                Actes: "0560",
                Medicame: "3313",
                Prothes: "813",
                Categorie: "Masonry & Precast",
                Nature: "Capra ibex",
                Nq: "852",
                Totale: "90",
            },
            {
                Type: "jcb",
                Info: "Jasmine Coupar",
                Ipp: "869",
                Nf: "6570",
                Actes: "8765",
                Medicame: "08",
                Prothes: "88620",
                Categorie: "Elevator",
                Nature: "Tragelaphus angasi",
                Nq: "16",
                Totale: "2",
            },
            {
                Type: "switch",
                Info: "Jaine Purple",
                Ipp: "6",
                Nf: "4025",
                Actes: "7",
                Medicame: "6829",
                Prothes: "554",
                Categorie: "Electrical and Fire Alarm",
                Nature: "Francolinus coqui",
                Nq: "7",
                Totale: "196",
            },
            {
                Type: "visa-electron",
                Info: "Lorilyn Taggerty",
                Ipp: "1",
                Nf: "04",
                Actes: "98",
                Medicame: "6",
                Prothes: "02755",
                Categorie: "Framing (Steel)",
                Nature: "Speotyte cuniculata",
                Nq: "9",
                Totale: "9282",
            },
            {
                Type: "maestro",
                Info: "Karly Watman",
                Ipp: "04742",
                Nf: "12",
                Actes: "8376",
                Medicame: "74046",
                Prothes: "8",
                Categorie: "Exterior Signage",
                Nature: "Oxybelis fulgidus",
                Nq: "53",
                Totale: "766",
            },
        ],
    }),
    props: ["selected"],
};
</script>

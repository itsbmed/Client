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
                    <tr v-for="data in H_allData" :key="data.name">
                        <th scope="row">{{ data.Type }}</th>
                        <td>{{ data.info }}</td>
                        <td>{{ data.Ipp }}</td>
                        <td>{{ data.Date }}</td>
                        <td>{{ data.Date_AD }}</td>
                        <td>{{ data.Date_Srt }}</td>
                        <td>{{ data.Service }}</td>
                        <td>{{ data.Categorie }}</td>
                        <td>{{ data.Type_Ad }}</td>
                        <td>{{ data.Tn_Ercure }}</td>
                        <td>{{ data.Tn_Nom }}</td>
                        <td style="color: red">Pas Facture</td>
                        <td>
                            <v-icon>mdi-account-edit</v-icon>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table
            v-if="selected[0] == 'Externe' || selected.length == 2"
            fixed-header
            height="400px"
        >
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
                    <tr v-for="data in Ex_allData" :key="data.name">
                        <th scope="row">{{ data.Type }}</th>
                        <td>{{ data.info }}</td>
                        <td>{{ data.Ipp }}</td>
                        <td>{{ data.Date }}</td>
                        <td>{{ data.Nature }}</td>
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
        Ex_Head: {
            Type: "Type",
            info: "Nom et prenom",
            Ipp: "Ipp",
            Date: "Date",
            Type_Ad: "Type_Ad",
            Nature: "Nature De Presentation",
        },
        H_allData: [
            {
                Type: "jcb",
                Nature: "Alcoy",
                info: "Carola Guerrier",
                Ipp: "99910",
                Date: "11/27/2020",
                Date_AD: "10/17/2020",
                Date_Srt: "4/2/2021",
                Service: "cguerrier0",
                Categorie: "cguerrier0",
                Type_Ad: true,
                Tn_Ercure: "European red squirrel",
                Tn_Nom: "Opela",
            },
            {
                Type: "bankcard",
                Nature: "Jām Sāhib",
                info: "Gustavus Sefton",
                Ipp: "76",
                Date: "7/29/2020",
                Date_AD: "5/19/2021",
                Date_Srt: "9/27/2020",
                Service: "gsefton1",
                Categorie: "gsefton1",
                Type_Ad: false,
                Tn_Ercure: "Grey heron",
                Tn_Nom: "Bamity",
            },
            {
                Type: "instapayment",
                Nature: "Minuyan",
                info: "Meggi Nehlsen",
                Ipp: "250",
                Date: "12/28/2020",
                Date_AD: "4/26/2021",
                Date_Srt: "12/7/2020",
                Service: "mnehlsen2",
                Categorie: "mnehlsen2",
                Type_Ad: false,
                Tn_Ercure: "Shrew, mandras tree",
                Tn_Nom: "Flexidy",
            },
            {
                Type: "switch",
                Nature: "Pateh Sam",
                info: "Rivi Tivnan",
                Ipp: "1913",
                Date: "9/17/2020",
                Date_AD: "8/9/2020",
                Date_Srt: "4/6/2021",
                Service: "rtivnan3",
                Categorie: "rtivnan3",
                Type_Ad: true,
                Tn_Ercure: "African clawless otter",
                Tn_Nom: "Domainer",
            },
            {
                Type: "diners-club-carte-blanche",
                Nature: "Xingpinglu",
                info: "Lars Cadden",
                Ipp: "49",
                Date: "3/20/2021",
                Date_AD: "11/21/2020",
                Date_Srt: "11/16/2020",
                Service: "lcadden4",
                Categorie: "lcadden4",
                Type_Ad: false,
                Tn_Ercure: "Avocet, pied",
                Tn_Nom: "Quo Lux",
            },
            {
                Type: "diners-club-us-ca",
                Nature: "Rače",
                info: "Auberon Lukehurst",
                Ipp: "82",
                Date: "5/21/2021",
                Date_AD: "12/19/2020",
                Date_Srt: "12/20/2020",
                Service: "alukehurst5",
                Categorie: "alukehurst5",
                Type_Ad: false,
                Tn_Ercure: "Wapiti, elk,",
                Tn_Nom: "Matsoft",
            },
            {
                Type: "jcb",
                Nature: "Sumber Tengah",
                info: "Kare Ferrolli",
                Ipp: "75319",
                Date: "1/17/2021",
                Date_AD: "3/6/2021",
                Date_Srt: "9/17/2020",
                Service: "kferrolli6",
                Categorie: "kferrolli6",
                Type_Ad: false,
                Tn_Ercure: "Tortoise, burmese black mountain",
                Tn_Nom: "Tresom",
            },
            {
                Type: "jcb",
                Nature: "Manuel Roxas",
                info: "Cornelia Andreas",
                Ipp: "7",
                Date: "1/6/2021",
                Date_AD: "4/13/2021",
                Date_Srt: "11/20/2020",
                Service: "candreas7",
                Categorie: "candreas7",
                Type_Ad: true,
                Tn_Ercure: "Civet, common palm",
                Tn_Nom: "Stronghold",
            },
            {
                Type: "jcb",
                Nature: "Shujāābād",
                info: "Rivi Fairbridge",
                Ipp: "3190",
                Date: "2/23/2021",
                Date_AD: "12/3/2020",
                Date_Srt: "6/17/2020",
                Service: "rfairbridge8",
                Categorie: "rfairbridge8",
                Type_Ad: true,
                Tn_Ercure: "Booby, blue-faced",
                Tn_Nom: "Otcom",
            },
            {
                Type: "americanexpress",
                Nature: "Quwaysinā",
                info: "Ilka Janzen",
                Ipp: "44",
                Date: "10/4/2020",
                Date_AD: "6/7/2020",
                Date_Srt: "1/11/2021",
                Service: "ijanzen9",
                Categorie: "ijanzen9",
                Type_Ad: true,
                Tn_Ercure: "Carpet snake",
                Tn_Nom: "Bitchip",
            },
            {
                Type: "visa-electron",
                Nature: "Pasirmalang",
                info: "Danya Balcock",
                Ipp: "29791",
                Date: "7/30/2020",
                Date_AD: "2/21/2021",
                Date_Srt: "6/28/2020",
                Service: "dbalcocka",
                Categorie: "dbalcocka",
                Type_Ad: true,
                Tn_Ercure: "White-eye, pale",
                Tn_Nom: "Fixflex",
            },
            {
                Type: "jcb",
                Nature: "Xinzhou",
                info: "Dud Beckson",
                Ipp: "49464",
                Date: "2/13/2021",
                Date_AD: "1/28/2021",
                Date_Srt: "5/26/2021",
                Service: "dbecksonb",
                Categorie: "dbecksonb",
                Type_Ad: true,
                Tn_Ercure: "Rose-ringed parakeet",
                Tn_Nom: "Trippledex",
            },
            {
                Type: "maestro",
                Nature: "Regulice",
                info: "Shayne Sheers",
                Ipp: "6",
                Date: "2/22/2021",
                Date_AD: "5/20/2021",
                Date_Srt: "12/3/2020",
                Service: "ssheersc",
                Categorie: "ssheersc",
                Type_Ad: true,
                Tn_Ercure: "Tree porcupine",
                Tn_Nom: "Trippledex",
            },
            {
                Type: "mastercard",
                Nature: "Cocachacra",
                info: "Krystyna Brosnan",
                Ipp: "15",
                Date: "4/30/2021",
                Date_AD: "4/8/2021",
                Date_Srt: "3/11/2021",
                Service: "kbrosnand",
                Categorie: "kbrosnand",
                Type_Ad: true,
                Tn_Ercure: "White-faced whistling duck",
                Tn_Nom: "Tres-Zap",
            },
            {
                Type: "diners-club-us-ca",
                Nature: "Logan Lake",
                info: "Tanhya Di Biagi",
                Ipp: "2",
                Date: "12/21/2020",
                Date_AD: "2/3/2021",
                Date_Srt: "8/10/2020",
                Service: "tdie",
                Categorie: "tdie",
                Type_Ad: false,
                Tn_Ercure: "African skink",
                Tn_Nom: "Bigtax",
            },
            {
                Type: "jcb",
                Nature: "Vidin",
                info: "Evelyn Devereu",
                Ipp: "31350",
                Date: "11/11/2020",
                Date_AD: "6/13/2020",
                Date_Srt: "4/16/2021",
                Service: "edevereuf",
                Categorie: "edevereuf",
                Type_Ad: true,
                Tn_Ercure: "Fox, asian red",
                Tn_Nom: "Tin",
            },
            {
                Type: "mastercard",
                Nature: "Järfälla",
                info: "Miltie Seydlitz",
                Ipp: "74786",
                Date: "7/20/2020",
                Date_AD: "5/22/2021",
                Date_Srt: "7/19/2020",
                Service: "mseydlitzg",
                Categorie: "mseydlitzg",
                Type_Ad: true,
                Tn_Ercure: "White-headed vulture",
                Tn_Nom: "Hatity",
            },
            {
                Type: "visa-electron",
                Nature: "Kafr Zaytā",
                info: "Toiboid Anscott",
                Ipp: "9",
                Date: "1/22/2021",
                Date_AD: "12/15/2020",
                Date_Srt: "3/17/2021",
                Service: "tanscotth",
                Categorie: "tanscotth",
                Type_Ad: true,
                Tn_Ercure: "Two-toed tree sloth",
                Tn_Nom: "Duobam",
            },
            {
                Type: "mastercard",
                Nature: "Liuqiao",
                info: "Dugald Jenton",
                Ipp: "89",
                Date: "6/25/2020",
                Date_AD: "10/30/2020",
                Date_Srt: "10/27/2020",
                Service: "djentoni",
                Categorie: "djentoni",
                Type_Ad: true,
                Tn_Ercure: "Blue peacock",
                Tn_Nom: "Zaam-Dox",
            },
            {
                Type: "visa-electron",
                Nature: "Kurba",
                info: "Nathan Adie",
                Ipp: "3",
                Date: "9/18/2020",
                Date_AD: "9/30/2020",
                Date_Srt: "7/9/2020",
                Service: "nadiej",
                Categorie: "nadiej",
                Type_Ad: true,
                Tn_Ercure: "Lemur, lesser mouse",
                Tn_Nom: "Voyatouch",
            },
        ],
        Ex_allData: [
            {
                Type: "jcb",
                Nature: "Alcoy",
                info: "Carola Guerrier",
                Ipp: "99910",
                Date: "11/27/2020",
                Date_AD: "10/17/2020",
                Date_Srt: "4/2/2021",
                Service: "cguerrier0",
                Categorie: "cguerrier0",
                Type_Ad: true,
                Tn_Ercure: "European red squirrel",
                Tn_Nom: "Opela",
            },
            {
                Type: "bankcard",
                Nature: "Jām Sāhib",
                info: "Gustavus Sefton",
                Ipp: "76",
                Date: "7/29/2020",
                Date_AD: "5/19/2021",
                Date_Srt: "9/27/2020",
                Service: "gsefton1",
                Categorie: "gsefton1",
                Type_Ad: false,
                Tn_Ercure: "Grey heron",
                Tn_Nom: "Bamity",
            },
            {
                Type: "instapayment",
                Nature: "Minuyan",
                info: "Meggi Nehlsen",
                Ipp: "250",
                Date: "12/28/2020",
                Date_AD: "4/26/2021",
                Date_Srt: "12/7/2020",
                Service: "mnehlsen2",
                Categorie: "mnehlsen2",
                Type_Ad: false,
                Tn_Ercure: "Shrew, mandras tree",
                Tn_Nom: "Flexidy",
            },
            {
                Type: "switch",
                Nature: "Pateh Sam",
                info: "Rivi Tivnan",
                Ipp: "1913",
                Date: "9/17/2020",
                Date_AD: "8/9/2020",
                Date_Srt: "4/6/2021",
                Service: "rtivnan3",
                Categorie: "rtivnan3",
                Type_Ad: true,
                Tn_Ercure: "African clawless otter",
                Tn_Nom: "Domainer",
            },
            {
                Type: "diners-club-carte-blanche",
                Nature: "Xingpinglu",
                info: "Lars Cadden",
                Ipp: "49",
                Date: "3/20/2021",
                Date_AD: "11/21/2020",
                Date_Srt: "11/16/2020",
                Service: "lcadden4",
                Categorie: "lcadden4",
                Type_Ad: false,
                Tn_Ercure: "Avocet, pied",
                Tn_Nom: "Quo Lux",
            },
            {
                Type: "diners-club-us-ca",
                Nature: "Rače",
                info: "Auberon Lukehurst",
                Ipp: "82",
                Date: "5/21/2021",
                Date_AD: "12/19/2020",
                Date_Srt: "12/20/2020",
                Service: "alukehurst5",
                Categorie: "alukehurst5",
                Type_Ad: false,
                Tn_Ercure: "Wapiti, elk,",
                Tn_Nom: "Matsoft",
            },
        ],
    }),
    props: ["selected"],
};
</script>

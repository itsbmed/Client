<template>
    <v-container>
        <Hospitalise v-if="caseType == 'hosp'" />
        <Extern v-else-if="caseType == 'ext'" />
        <div v-else class="mt-5 py-10 align-center d-flex flex-column">
            <h1 class="title mb-2 text-center">
                Veuillez sélectionner le type de cas
            </h1>

            <v-btn
                class="mb-5 mt-10 choises text-capitalize"
                color="primary"
                elevation="0"
                outlined
                width="160"
                height="50"
                @click="changeCaseType('hosp')"
            >
                Hospitalise
            </v-btn>
            <v-btn
                width="160"
                height="50"
                color="primary"
                elevation="0"
                outlined
                class="choises text-capitalize"
                @click="changeCaseType('ext')"
            >
                Extern
            </v-btn>
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
    name: "Patient",
    components: {
        Hospitalise: () => import("@/components/Patient/Hospitalise/index"),
        Extern: () => import("@/components/Patient/Extern/index"),
    },
    computed: {
        ...mapGetters(["caseType"]),
    },

    methods: {
        ...mapActions(["changeCaseType"]),
    },
};
</script>

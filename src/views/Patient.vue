<template>
    <v-container>
        <div class="mt-5 py-10 align-center d-flex flex-column">
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
                to="/patient/hospitalise"
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
                to="/patient/extern"
            >
                Extern
            </v-btn>
        </div>
    </v-container>
</template>

<script>
export default {
    name: "Patient",
};
</script>

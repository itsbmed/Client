<template>
    <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
                <slot></slot>
            </span>
        </template>
        <v-card flat class="mx-auto py-4 add-facture" max-width="700px">
            <Facture context="hospFact" />
            <div class="text-center">
                <a
                    class="text-none blue--text mx-auto underlined-on-hover"
                    text
                    @click="dialog = false"
                >
                    cancel
                </a>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import Facture from "@/components/Patient/Extern/Step3";
export default {
    components: { Facture },
    data: () => ({
        dialog: false,
        loading: false,
    }),
};
</script>

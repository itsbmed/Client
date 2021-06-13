<template>
    <div class="date-pickers d-flex align-center">
        <span class="me-2">From: </span>
        <v-text-field
            v-model="fromDate"
            rounded
            outlined
            dense
            label="From"
            placeholder="From"
            single-line
            hide-details
            type="date"
            class="me-10"
        />
        <span class="me-2">To: </span>
        <v-text-field
            v-model="toDate"
            rounded
            outlined
            dense
            label="From"
            placeholder="From"
            single-line
            hide-details
            type="date"
        />
        <v-btn outlined color="blue" rounded class="ms-8 text-none" width="100">
            Apply
        </v-btn>
    </div>
</template>

<script>
export default {
    data: () => ({
        fromDate: null,
        toDate: null,
    }),
};
</script>

<style></style>

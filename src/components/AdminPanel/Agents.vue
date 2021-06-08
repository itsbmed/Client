<template>
    <v-simple-table class="ms-2">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">firsname</th>
                    <th class="text-left">lastname</th>
                    <th class="text-left">username</th>
                    <th class="text-left">Admin</th>
                    <th class="text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="agent in agents" :key="agent.userName">
                    <td>{{ agent.firstName }}</td>
                    <td>{{ agent.lastName }}</td>
                    <td>{{ agent.userName }}</td>
                    <td>{{ agent.isAdmin }}</td>
                    <td>
                        <v-btn icon>
                            <v-icon color="blue" size="25">
                                mdi-square-edit-outline
                            </v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    name: "Agents",
    data: () => ({
        agents: [],
    }),
    async mounted() {
        try {
            let res = await this.$axios.get("/agents");
            this.agents = res.data;
            console.log(res);
        } catch (err) {
            console.log(err);
            this.$notify({
                group: "br",
                type: "error",
                title: "Submit error",
                text: err.response?.data?.message,
            });
        }
    },
};
</script>

<template>
    <v-container>
        <div class="mb-8 d-flex">
            <router-link
                to="/admin-panel/add-agent"
                class="rm-underline ms-auto"
            >
                <v-btn outlined class="rounded-lg text-none" color="primary">
                    <v-icon left size="20">mdi-plus</v-icon>
                    Add new agent
                </v-btn>
            </router-link>
        </div>
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
                    <tr v-if="existMore" class="mt-2">
                        <td colspan="5" class="text-center">
                            <v-btn
                                class="text-none"
                                @click="getAgents()"
                                outlined
                                color="blue"
                                :loading="loading"
                                :disabled="loading"
                            >
                                Load more
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
export default {
    name: "Agents",
    data: () => ({
        agents: [],
        page: 1,
        loading: false,
        existMore: true,
    }),
    methods: {
        async getAgents() {
            this.loading = true;
            try {
                let res = await this.$axios.get("/agents?page=" + this.page);
                this.agents.push(...res.data);
                this.page++;

                if (res.data.length < 10) {
                    this.existMore = false;
                }
            } catch (err) {
                console.log(err);
                this.$notify({
                    group: "br",
                    type: "error",
                    title: "Submit error",
                    text: err.response?.data?.message,
                });
            } finally {
                this.loading = false;
            }
        },
    },
    async mounted() {
        await this.getAgents();
    },
};
</script>

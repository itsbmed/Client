import axios from "@/plugins/axios";
export default {
    state: {
        episodeData: {},
    },
    mutations: {
        CLEAR_EPISODE_DATA(state) {
            state.episodeData = {};
        },
    },
    getters: {
        episodeData: (state) => state.episodeData,
    },
    actions: {
        saveEpisode(context, [payload, ipp]) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/patients/${ipp}/episodes`, payload)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        async clearEpisodeData(context) {
            await context.commit("CLEAR_EPISODE_DATA");
        },
    },
};

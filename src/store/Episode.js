import axios from "@/plugins/axios";
export default {
    state: {
        episodeData: {},
        episodeId: null,
    },
    mutations: {
        CLEAR_EPISODE_DATA(state) {
            state.episodeData = {};
        },
        SAVE_EPISODE_ID(state, id) {
            state.episodeId = id;
        },
    },
    getters: {
        episodeData: (state) => state.episodeData,
        episodeId: (state) => state.episodeId,
    },
    actions: {
        saveEpisode(context, [payload, ipp]) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`/patients/${ipp}/episodes`, payload)
                    .then((res) => {
                        context.commit("SAVE_EPISODE_ID", res.data.id);
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

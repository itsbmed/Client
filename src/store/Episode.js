import axios from "@/plugins/axios";
export default {
    state: {
        hospEpisodeData: {},
        extEpisodeData: {},

        extEpisodes: [],
        hospEpisodes: [],

        episodeId: null,
    },
    mutations: {
        CLEAR_HOSP_EPISODE_DATA(state) {
            state.hospEpisodeData = {};
        },
        CLEAR_EXT_EPISODE_DATA(state) {
            state.extEpisodeData = {};
        },
        SAVE_EPISODE_ID(state, id) {
            state.episodeId = id;
        },
        ADD_HOSP_EPISODES(state, payload) {
            state.hospEpisodes = payload;
        },
        PUSH_HOSP_EPISODES(state, payload) {
            state.hospEpisodes.push(...payload);
        },
        ADD_EXT_EPISODES(state, payload) {
            state.extEpisodes = payload;
        },
        PUSH_EXT_EPISODES(state, payload) {
            state.extEpisodes.push(...payload);
        },
        CLEAR_EPISODES(state) {
            state.extEpisodes = [];
            state.hospEpisodes = [];
        },
    },
    getters: {
        hospEpisodeData: (state) => state.hospEpisodeData,
        extEpisodeData: (state) => state.extEpisodeData,
        episodeId: (state) => state.episodeId,
        extEpisodes: (state) => state.extEpisodes,
        hospEpisodes: (state) => state.hospEpisodes,
        isThereMoreData: (state) => state.moreData,
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
        getHospEpisodes(context, ipp) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/patients/${ipp}/episodes?type=hospitalized`)
                    .then((res) => {
                        context.commit("ADD_HOSP_EPISODES", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        pushHospEpisodes(context, [ipp, page]) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `/patients/${ipp}/episodes?type=hospitalized&page=${page}`
                    )
                    .then((res) => {
                        context.commit("PUSH_HOSP_EPISODES", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        getExtEpisodes(context, ipp) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/patients/${ipp}/episodes?type=external`)
                    .then((res) => {
                        context.commit("ADD_EXT_EPISODES", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        pushExtEpisodes(context, [ipp, page]) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/patients/${ipp}/episodes?type=external&page=${page}`)
                    .then((res) => {
                        context.commit("PUSH_EXT_EPISODES", res.data);
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },

        async clearEpisodes(context) {
            await context.commit("CLEAR_EPISODES");
        },
        async clearHospEpisodeData(context) {
            await context.commit("CLEAR_HOSP_EPISODE_DATA");
        },
        async clearExtEpisodeData(context) {
            await context.commit("CLEAR_EXT_EPISODE_DATA");
        },
    },
};

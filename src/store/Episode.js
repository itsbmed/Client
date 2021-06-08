import axios from "@/plugins/axios";
export default {
    state: {
        hospEpisodeFrom: {},
        extEpisodeFrom: {},

        extEpisodes: [],
        hospEpisodes: [],

        episodeId: null,
    },
    mutations: {
        CLEAR_HOSP_EPISODE_DATA(state) {
            state.hospEpisodeFrom = {};
        },
        CLEAR_EXT_EPISODE_DATA(state) {
            state.extEpisodeFrom = {};
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
        UPDATE_EXT_EPISODE(state, [payload, index]) {
            state.extEpisodes[index] = payload;
        },
        UPDATE_HOSP_EPISODE(state, [payload, index]) {
            state.hospEpisodes[index] = payload;
        },
        CLEAR_EPISODES(state) {
            state.extEpisodes = [];
            state.hospEpisodes = [];
        },
    },
    getters: {
        hospEpisodeFrom: (state) => state.hospEpisodeFrom,
        extEpisodeFrom: (state) => state.extEpisodeFrom,
        episodeId: (state) => state.episodeId,
        extEpisodes: (state) => state.extEpisodes,
        hospEpisodes: (state) => state.hospEpisodes,
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
                        console.log(res.data);
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
                        console.log(res.data);
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
        async updateExtEpisode(context, [payload, index]) {
            await context.commit("UPDATE_EXT_EPISODE", [payload, index]);
        },
        async updateHospEpisode(context, [payload, index]) {
            await context.commit("UPDATE_HOSP_EPISODE", [payload, index]);
        },
        async clearEpisodes(context) {
            await context.commit("CLEAR_EPISODES");
        },
        async clearhospEpisodeFrom(context) {
            await context.commit("CLEAR_HOSP_EPISODE_DATA");
        },
        async clearextEpisodeFrom(context) {
            await context.commit("CLEAR_EXT_EPISODE_DATA");
        },
    },
};

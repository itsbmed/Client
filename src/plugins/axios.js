import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030/api/v1";

// Add a request interceptor
axios.interceptors.request.use(
    async function (config) {
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {}
);

export default axios;

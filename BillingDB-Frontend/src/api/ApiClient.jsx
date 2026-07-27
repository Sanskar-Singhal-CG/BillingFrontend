import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

console.log("backend url is", import.meta.env.VITE_API_BASE_URL);

export default apiClient;
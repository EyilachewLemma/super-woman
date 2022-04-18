import axios from "axios";
let apiClient = axios.create({
    baseURL: 'https://admin.super-women.merahitechnologies.com',
    // baseURL: 'http://10.161.179.66:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default apiClient
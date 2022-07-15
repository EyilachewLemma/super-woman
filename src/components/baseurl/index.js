import axios from "axios";
let apiClient = axios.create({
    // baseURL: 'https://admin.super-women.merahitechnologies.com',
    baseURL: 'http://10.161.166.32:8000',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',


    }
})

export default apiClient
import axios from "axios";
let multiplApiClient = axios.create({
    // baseURL: 'https://admin.super-women.merahitechnologies.com',
    baseURL: 'http://10.161.179.66:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'mult_part/json',
    }
})

export default multiplApiClient
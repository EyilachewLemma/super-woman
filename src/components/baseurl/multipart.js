import axios from "axios";
let imageApi = axios.create({
    // baseURL: 'https://admin.super-women.merahitechnologies.com',
    baseURL: 'http://10.161.68.254:8001',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'mult_part/json',
        Authorization: `Bearer ${localStorage.getItem('tokenB')}`,
        'Access-Control-Allow-Origin': '*',
    }
})

export default imageApi
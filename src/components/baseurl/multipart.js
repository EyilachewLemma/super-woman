import axios from "axios";
let multiplApiClient = axios.create({
    baseURL: 'http://192.168.137.239:8000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'mult_part/json',
    }
})

export default multiplApiClient
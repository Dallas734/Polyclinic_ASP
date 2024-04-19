import axios from "axios";

export const Fetch = axios.create({
    baseURL: 'https://localhost:44390/',
    headers: {
        Accept: 'application/json'
    },
    withCredentials: true
})
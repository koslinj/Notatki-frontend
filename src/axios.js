import axios from "axios"

const instance = axios.create({
    baseURL: process.env.API_URL || 'https://notatki-api.onrender.com/api'
});

export default instance;
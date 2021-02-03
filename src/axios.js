import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-fullstack-4b57b.cloudfunctions.net/api'
     //EL LINK DEL API (CLOUD FUNCTION) url
});

export default instance;
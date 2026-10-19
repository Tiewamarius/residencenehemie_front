// src/api/axios.js

import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default api;
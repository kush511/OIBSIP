import axios from "axios"

const baseURL = process.env.API_BASE_URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;